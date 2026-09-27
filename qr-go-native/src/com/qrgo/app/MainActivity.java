package com.qrgo.app;

import android.app.Activity;
import android.os.Bundle;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.view.Gravity;
import android.view.View;
import android.widget.*;
import java.util.*;

public class MainActivity extends Activity {
    private LinearLayout root;
    private final int BLUE = Color.rgb(10,124,255);
    private final int NAVY = Color.rgb(11,31,58);
    private final int BG = Color.rgb(247,249,252);
    private final int MUTED = Color.rgb(100,116,139);
    private final int LINE = Color.rgb(226,232,240);
    private final int GREEN = Color.rgb(34,197,94);

    @Override public void onCreate(Bundle b) {
        super.onCreate(b);
        getWindow().setStatusBarColor(Color.WHITE);
        getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
        showWelcome();
    }

    private int dp(int v){ return (int)(v * getResources().getDisplayMetrics().density + .5f); }
    private GradientDrawable bg(int color, int radius){
        GradientDrawable g = new GradientDrawable();
        g.setColor(color); g.setCornerRadius(dp(radius)); return g;
    }
    private TextView text(String s, int sp, int color, boolean bold){
        TextView t = new TextView(this); t.setText(s); t.setTextSize(sp); t.setTextColor(color);
        if(bold) t.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        t.setLineSpacing(0,1.12f); return t;
    }
    private void base(){
        ScrollView sc = new ScrollView(this); sc.setFillViewport(true); sc.setBackgroundColor(BG);
        root = new LinearLayout(this); root.setOrientation(LinearLayout.VERTICAL);
        root.setPadding(dp(20),dp(22),dp(20),dp(28)); root.setGravity(Gravity.TOP);
        sc.addView(root, new ScrollView.LayoutParams(-1,-2)); setContentView(sc);
    }
    private void brand(){
        LinearLayout row = new LinearLayout(this); row.setOrientation(LinearLayout.HORIZONTAL); row.setGravity(Gravity.CENTER_VERTICAL);
        TextView mark = text("⌗",28,Color.WHITE,true); mark.setGravity(Gravity.CENTER); mark.setBackground(bg(BLUE,14));
        row.addView(mark,new LinearLayout.LayoutParams(dp(48),dp(48)));
        LinearLayout words = new LinearLayout(this); words.setOrientation(LinearLayout.VERTICAL); words.setPadding(dp(10),0,0,0);
        TextView logo=text("QR Go",26,NAVY,true); TextView tag=text("Escaneou. Avisou. Entregou.",10,MUTED,false);
        words.addView(logo); words.addView(tag); row.addView(words); root.addView(row);
        spacer(22);
    }
    private void spacer(int h){ Space s=new Space(this); root.addView(s,new LinearLayout.LayoutParams(1,dp(h))); }
    private void title(String s){ root.addView(text(s,29,Color.rgb(15,23,42),true)); spacer(8); }
    private void p(String s){ root.addView(text(s,15,MUTED,false)); spacer(14); }
    private LinearLayout card(){
        LinearLayout c=new LinearLayout(this); c.setOrientation(LinearLayout.VERTICAL); c.setPadding(dp(16),dp(16),dp(16),dp(16));
        GradientDrawable g=bg(Color.WHITE,18); g.setStroke(dp(1),LINE); c.setBackground(g);
        LinearLayout.LayoutParams lp=new LinearLayout.LayoutParams(-1,-2); lp.setMargins(0,0,0,dp(12)); root.addView(c,lp); return c;
    }
    private Button button(String label, boolean outline, final Runnable r){
        Button b=new Button(this); b.setText(label); b.setTextSize(16); b.setAllCaps(false); b.setTypeface(Typeface.DEFAULT,Typeface.BOLD);
        GradientDrawable g=bg(outline?Color.WHITE:BLUE,14); if(outline) g.setStroke(dp(1),BLUE); b.setBackground(g);
        b.setTextColor(outline?BLUE:Color.WHITE); b.setPadding(dp(14),0,dp(14),0);
        LinearLayout.LayoutParams lp=new LinearLayout.LayoutParams(-1,dp(54)); lp.setMargins(0,0,0,dp(10)); root.addView(b,lp);
        b.setOnClickListener(v->r.run()); return b;
    }
    private void addBack(final Runnable r){ button("Voltar",true,r); }
    private void addCardText(LinearLayout c,String a,String b,String status){
        TextView h=text(a,18,Color.rgb(15,23,42),true); c.addView(h); TextView sub=text(b,14,MUTED,false); c.addView(sub);
        if(status!=null){ TextView st=text(status,14,status.startsWith("✓")||status.startsWith("●")?GREEN:Color.rgb(239,68,68),true); c.addView(st); }
    }

    private void showWelcome(){
        base(); spacer(40); brand(); spacer(40);
        title("Receba suas entregas com mais praticidade.");
        p("Um QR Code conecta o entregador diretamente com você sem revelar seu telefone.");
        spacer(20); button("Entrar",false,this::showLogin); button("Criar minha conta",true,this::showLogin);
    }
    private void showLogin(){
        base(); brand(); title("Entrar"); p("Acesse sua conta QR Go.");
        EditText email=new EditText(this); email.setHint("E-mail ou celular"); email.setSingleLine(true); styleInput(email); root.addView(email,inputLp());
        EditText pass=new EditText(this); pass.setHint("Senha"); pass.setSingleLine(true); pass.setInputType(0x00000081); styleInput(pass); root.addView(pass,inputLp());
        spacer(8); button("Entrar",false,this::showHome); button("Esqueci minha senha",true,()->{});
    }
    private LinearLayout.LayoutParams inputLp(){ LinearLayout.LayoutParams lp=new LinearLayout.LayoutParams(-1,dp(54)); lp.setMargins(0,0,0,dp(10)); return lp; }
    private void styleInput(EditText e){ GradientDrawable g=bg(Color.WHITE,14); g.setStroke(dp(1),LINE); e.setBackground(g); e.setPadding(dp(14),0,dp(14),0); e.setTextColor(Color.rgb(15,23,42)); e.setHintTextColor(Color.rgb(148,163,184)); }

    private void showHome(){
        base(); brand(); title("Olá, Gabriela 👋");
        LinearLayout c=card(); addCardText(c,"Residencial Jardim","Torre B — Apto 305","● Disponível para receber");
        button("Meu QR",false,this::showQR); button("Entregas",true,this::showDeliveries); button("Conversas",true,this::showChat); button("Modo ausente",true,this::showAway);
        LinearLayout last=card(); addCardText(last,"Última entrega","Mercado Livre · Hoje — 14:32","✓ Entrega concluída");
        button("Perfil",true,this::showProfile);
    }
    private void showQR(){
        base(); brand(); title("Meu QR Code");
        LinearLayout c=card(); addCardText(c,"Residencial Jardim","Torre B — Apto 305","● QR ativo");
        TextView q=text("▦",96,NAVY,true); q.setGravity(Gravity.CENTER); q.setPadding(0,dp(18),0,dp(4)); c.addView(q,new LinearLayout.LayoutParams(-1,dp(150)));
        TextView token=text("X8K29Q",13,MUTED,true); token.setGravity(Gravity.CENTER); c.addView(token);
        button("Salvar QR",false,()->toast("QR salvo para teste")); button("Compartilhar",true,()->toast("Compartilhamento de teste")); button("Gerar novo QR",true,()->toast("Novo QR gerado")); addBack(this::showHome);
    }
    private void showDeliveries(){
        base(); brand(); title("Entregas");
        String[][] data={{"Mercado Livre","Hoje — 14:32","✓ Concluída"},{"iFood","Hoje — 12:15","✓ Entregue pessoalmente"},{"Shopee","Ontem — 18:20","✓ Portaria"},{"Correios","23/09","Não concluída"}};
        for(String[] x:data){ LinearLayout c=card(); addCardText(c,x[0],x[1],x[2]); }
        addBack(this::showHome);
    }
    private void showChat(){
        base(); brand(); title("Entrega em andamento"); p("Conversa temporária entre morador e entregador.");
        LinearLayout a=card(); addCardText(a,"Entregador","Cheguei com sua entrega. Estou na portaria.",null);
        LinearLayout b=card(); addCardText(b,"Você","Já estou descendo.",null);
        EditText m=new EditText(this); m.setHint("Digite uma mensagem"); styleInput(m); root.addView(m,inputLp());
        button("Enviar",false,()->{ if(m.getText().length()>0){ toast("Mensagem enviada"); m.setText(""); }}); addBack(this::showHome);
    }
    private void showAway(){
        base(); brand(); title("Modo ausente"); p("Defina o que o entregador deve fazer quando você não estiver disponível.");
        LinearLayout c=card(); addCardText(c,"Estou ausente","Pode deixar a encomenda na caixa ao lado do portão.","● Ativo");
        button("Pode deixar a encomenda",false,()->toast("Preferência salva")); button("Não deixar a encomenda",true,()->toast("Preferência salva")); button("Aguardar meu contato",true,()->toast("Preferência salva")); addBack(this::showHome);
    }
    private void showProfile(){
        base(); brand(); title("Perfil");
        LinearLayout c=card(); addCardText(c,"Gabriela","Conta do morador",null);
        String[] opts={"Minhas residências","Minha assinatura","Preferências de entrega","Notificações","Segurança e privacidade","Ajuda","Sobre o QR Go"};
        for(String x:opts) button(x,true,()->toast("Tela de teste"));
        addBack(this::showHome);
    }
    private void toast(String s){ Toast.makeText(this,s,Toast.LENGTH_SHORT).show(); }
}