confirm("Are you sure you want to delete?")
$(document).ready(function(){

    $(".mudaTela").click(function(){
        mudaTela( $(this), $(this).attr("nova"), $(this).attr("animacao"), $(this).attr("tempoAnimacao") );
    });

    $("a.opcoes").click(function(e){
        e.preventDefault();
        $("div.opcoes").slideToggle(500);
    });

    $(".calendario .marcado").click(function(){
        mostraMsgMes($(this).attr("value"));
    });

    const mudaTela = ( atual, nova = null, animacao = "fade", tempoAnimacao = 900 ) => {

        // define a nova tela
        if(!nova){
            nova = parseInt(atual.parent().attr("id").split("tela")[1])+1;
        }

        if(animacao == "fade"){
            $("#tela"+(nova-1)).fadeOut(tempoAnimacao);
            setTimeout(() => {
                $("#tela"+nova).fadeIn(tempoAnimacao)
            }, tempoAnimacao);
        }else{
            $("#tela"+(nova-1)).hide(tempoAnimacao);
            $("#tela"+nova).show(tempoAnimacao);
        }

        if($("#tela"+nova).hasClass("temporizado")){
            $("#tela"+nova+" div").hide();
            telaTemporizada(nova, 0);
        }

        verificaFundo(nova);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if(nova == 5){
            var audio = new Audio('assets/musica.mp3');
            audio.volume = 0.2;
            audio.play();
        }
        
    }

    const telaTemporizada = ( nTela, contador ) =>{

        const tela = $("#tela"+nTela+" div:eq("+contador+")");
        const temporizador = 500;
        const temporizadorPrimeiraTela = (contador==0?$("#tela"+nTela).attr("tempo"):temporizador);

        setTimeout(() => {
            tela.fadeIn(temporizador);

            setTimeout(() => {
                tela.fadeOut(temporizador);
                if(tela.attr("final") == "true"){
                    mudaTela(null, nTela+1, "fade", 900);
                    verificaFundo(nTela+1);
                }else{
                    telaTemporizada(nTela, contador+1);
                }

            }, tela.attr("tempo") );

        }, temporizadorPrimeiraTela);
        
    }

    const verificaFundo = (nTela) =>{

        const fundo = $("#tela"+nTela).attr("fundo");
        const tempo = $("#tela"+nTela).attr("tempo");

        if(fundo){
            $("body").attr("class", fundo);            
        }
        
    }

    const mostraMsgMes = (texto) =>{

        let titulo;
        let mensagem;

        switch(texto){
            case "5/5": titulo = "24 de agosto de 2023"; mensagem = "<p>El día que nos conocimos!</p><p> Nunca olvidaré ese día, recuerdo mirar su foto y pensar que argentino guapo jajaja, leí su descripción del perfil y me pareció muy lindo, no esperaba que fuéramos a tener un Mach.</p><p>Fue muy rápido!</p>";break;
            case "8/5": titulo = "28 de agosto de 2023"; mensagem = "<p>COGER</p><p>Mi primera vergüenza en español haha, y probablemente voy a pasar muchas otras vergüenzas porque tengo mala memoria jajaja ❤️</p>";break;
            case "15/5": titulo = "29 de agosto de 2023"; mensagem = "<p>Recuerdas que te pregunté lo que sentías por mí y me respondiste con un audio? Ese audio. Dios mío, no tienes ni idea de cómo ese audio me ha afectado, no había escuchado cosas tan hermosas en mucho tiempo.</p><p>Y fue justo en ese momento que ganaste por completo mi corazón</p>";break;
            case "22/5": titulo = "30 de agosto de 2023"; mensagem = "<p>La primera vez que hablamos por Discord, estaba tan nerviosa, con mariposas en el estómago, con miedo de que no pudieras entenderme o que yo no pudiera entenderte, además del miedo de que no te gustara por ser demasiado tímida.</p>";break;
            case "29/5": titulo = "29 de Maio de 2021"; mensagem = "<p>Essa foi a vez que mais rodamos a cidade em busca de um lugar para ficar 🤣<br>Chegamos a ideia do cemitério, que embora fosse sinistro, ainda foi e é um ótimo lugar para ficarmos haha.</p><p>Nesse dia acabamos indo muito cedo para a sua casa, e encontramos com seu irmão e o namorado dele, foi quando eu os conheci. A primeira impressão que tive do seu irmão é que ele é uma pessoa extremamente amigável <small><del>eu pegava</del></small>.</p>";break;
            case "3/6": titulo = "02 de septiembre de 2023"; mensagem = "<p>Fue la primera vez que dije te quiero, en realidad quería decir te amo pero tenía miedo de que fuera demasiado pronto y te asustaras.</p>";break;
            case "5/6": titulo = "04 de septiembre de 2023"; mensagem = "<p>Sería el comienzo de nuestra relación tal vez? Fue que dijiste que querías que yo fuera tuya para toda la vida, te dije que deberías pedírmelo.</p>";break;
            case "12/6": titulo = "10 de septiembre de 2023"; mensagem = "<p>El día del presente a cambio de la llama 🤣, ese día me morí de vergüenza, nunca lo había hecho antes, creo que fue un gran paso para que me sintiera más a gusto contigo.</p>";break;
            case "13/6": titulo = "17 de septiembre de 2023"; mensagem = "<p>No tengo registro del día que me regaló la flor, pero ese fue el día que me regaló el gatito. Estos dos días nunca he estado más feliz y emocionada!</p>";break;
            case "19/6": titulo = "27 de septiembre de 2023"; mensagem = "<section class='text-center'><p class='letra-vermelha'><strong>Este momento está siendo escrito ahora...</strong></p></section>";break;
            case "final": titulo = "27 de septiembre de 2023"; mensagem = "<section class='text-center mt-5 mb-5'><p><strong>El día que dijo<br><span class='letra2 letra-vermelha'>SÍ</span></strong></p></section>";break;
        }

        mostraPopUp(true, titulo, mensagem);
        telaFinal = (texto=="final"?true:false);
    }

    

});

let telaFinal = false;

const mostraPopUp = (mostrar, titulo = "Título de testes", mensagem = "Mensagem de teste...") =>{

    if(mostrar){
        $("html, body").animate({ scrollTop: $(".pop-up")[0].offsetTop }, "smooth");
        $(".pop-up").fadeIn(500);
        $(".pop-up h1").html(titulo);
        $(".pop-up div").html(mensagem);
        $(".container").css("opacity", "0.5");
    }else{
        $(".pop-up").fadeOut(500);
        $(".container").css("opacity", "1");

        if(telaFinal){
            $("#tela19").fadeOut(4000);
            setTimeout(() => {
                $("#tela20").fadeIn(6500);
                $("body").attr("class", "fundo6");    
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }, 4000);
        }

    }

}