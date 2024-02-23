const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexão com o banco de dados MongoDB
const uri = 'mongodb+srv://goomes016:Gabixp22@cluster0.3sa5lso.mongodb.net/';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao banco de dados'))
    .catch(error => console.error('Erro na conexão ao banco de dados:', error));

const saltRounds = 10;
const User = mongoose.model('User', {
    username: String,
    password: String,
    email: String,
    cargo: String,
    setor: String,
    dataNascimento: Date
});

// Configuração dos middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do diretório para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Configuração da sessão
app.use(session({
    secret: 'seu_segredo_aqui',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: uri,
        collectionName: 'sessions',
        ttl: 60 * 60 * 24
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

// Middleware para verificar autenticação do usuário
const authenticateUser = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ error: 'Não autenticado' });
    }
};

// Rotas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/perfil.html', authenticateUser, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'perfil.html'));
});

app.post('/auth/registro', async (req, res) => {
    const { username, password, email, cargo, setor, dataNascimento } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            console.log('Usuário já existe:', username);
            return res.status(400).json({ error: 'Usuário já existe' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({ username, password: hashedPassword, email, cargo, setor, dataNascimento });
        await newUser.save();

        console.log('Novo usuário cadastrado:', newUser);

        req.session.user = { username };
        res.json({ success: true });
    } catch (error) {
        console.error('Erro durante o registro:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            console.log('Usuário não encontrado:', username);
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            console.log('Senha incorreta para o usuário:', username);
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        req.session.user = { username };
        console.log('Login bem-sucedido para o usuário:', username);
        res.json({ success: true });
    } catch (error) {
        console.error('Erro durante o login:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.post('/auth/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao encerrar a sessão' });
        }
        res.json({ success: true });
    });
});

app.get('/usuario', authenticateUser, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.session.user.username });
        res.json(user);
    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
