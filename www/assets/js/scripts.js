(function(){
    $(document).ready(function(){
        var trab = $(".trab");
        var contato = function(){
            $('#form_contato').submit(false);
            $("#enviar_contato").click(function(){
                console.log("enviar");
                var ajax = $.ajax({
                    url: "sendmessage.php",
                    type: "POST",
                    data: {"name": $("#name").val(), "email": $("#email").val(), "message": $("#message").val(), "human": $("#human").val()}
                });

                ajax.success(function(data) {
                    $("#form_contato").html("Mensagem enviada com sucesso, responderei o mais rápido possível!");
                })

                ajax.error(function(){
                    $("#form_contato").html("Erro ao enviar mensagem!<br> Possiveis causas: <br> - Você não preencheu todos os campos <br> - Você errou a última questão");
                })
            })
        }
        //scroll suave para links #
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    if(target.offset().top < $(document).scrollTop()){
                        $('html,body').animate({
                            scrollTop: target.offset().top - 10
                        }, 500);
                    }else{
                        $('html,body').animate({
                            scrollTop: target.offset().top + 10
                        }, 500);
                    }
                    return false;
                }
            }
        });

        //controle da parte de secao lateral
        $(".secao").each(function(){
            $(this).waypoint({
                handler: function() {
                    var local = "#" + $($(this)[0].element).attr("id");
                    var scroll = $(window).scrollTop();
                    if(scroll < 850){
                        $(".nav_lateral > a").each(function(){
                            $(this).find(".nav_botao").removeClass("nav_hit");
                            if($(this).attr("href") == "#apresentacao"){
                                $(this).find(".nav_botao").addClass("nav_hit");
                            }
                        })
                    }else{
                        $(".nav_lateral > a").each(function(){
                            $(this).find(".nav_botao").removeClass("nav_hit");
                            if($(this).attr("href") == local){
                                $(this).find(".nav_botao").addClass("nav_hit");
                            }
                        })
                    }
                },
                offset: 100
            })
        });



        //hover na secao
        $(".nav_lateral").hover(function(){
            if($(window).width() > 1000){
                $(this).find(".nav_texto").show();
                $(this).find(".nav_texto").animate({"opacity": "1"}, 200);
            }else{
                $(this).find(".nav_texto").hide();
            }
        },
        function(){
            $(this).find(".nav_texto").animate({"opacity": "0"}, 200);
        });


        //hover nos trabalhos
        trab.hover(function(){
            $(this).append("<div class=\"trab trab_cruz\"><i class=\"fa fa-search fa-4x\"></i></div>");
            $(this).find("img").animate({width:225, height:225}, 100);
            $(this).find(".trab_cruz").animate({"opacity": "0.8"}, 100);
        }, function(){
            var trab_over = $(this).find(".trab_cruz");
            var trab_img = $(this).find("img");
            trab_over.animate({"opacity": "0"}, 80, "linear", function(){
                trab_over.remove();
                trab_img.animate({width:200, height:200}, 80);
            });

        });

        //controla pagina de
        $(".trab_modal").on("click", function(){
            var trab_content = $("#trab_content"),
                trab_loading = $("#trab_loading"),
                url = "trabs/" + $(this).data("trabalho") + ".html";
            trab_content.css({"opacity": "0"});
            trab_loading.show();
            var ajax = $.ajax({
                url: url,
            });

            ajax.success(function(data) {
                console.log("certo");
                trab_loading.hide();
                trab_content.html(data);
                trab_content.animate({"opacity": "1"}, 100);
                contato();
            })

            ajax.error(function(){
                console.log("Erro ao carregar o trabalho");
            })
        });
        $(".trab_modal").animatedModal();


        particlesJS("apresentacao", {
            "particles": {
              "number": {
                "value": 100,
                "density": {
                  "enable": true,
                  "value_area": 800
                }
              },
              "color": {
                "value": "#ffffff"
              },
              "shape": {
                "type": "circle",
                "stroke": {
                  "width": 1,
                  "color": "#ffffff"
                },
                "polygon": {
                  "nb_sides": 5
                },
                "image": {
                  "src": "img/github.svg",
                  "width": 100,
                  "height": 100
                }
              },
              "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                  "enable": false,
                  "speed": 1,
                  "opacity_min": 0.1,
                  "sync": false
                }
              },
              "size": {
                "value": 1,
                "random": true,
                "anim": {
                  "enable": false,
                  "speed": 40,
                  "size_min": 0.1,
                  "sync": false
                }
              },
              "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
              },
              "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                  "enable": false,
                  "rotateX": 600,
                  "rotateY": 1200
                }
              }
            },
            "interactivity": {
              "detect_on": "canvas",
              "events": {
                "onhover": {
                  "enable": true,
                  "mode": "repulse"
                },
                "onclick": {
                  "enable": true,
                  "mode": "push"
                },
                "resize": true
              },
              "modes": {
                "grab": {
                  "distance": 400,
                  "line_linked": {
                    "opacity": 1
                  }
                },
                "bubble": {
                  "distance": 400,
                  "size": 40,
                  "duration": 2,
                  "opacity": 8,
                  "speed": 3
                },
                "repulse": {
                  "distance": 200,
                  "duration": 0.4
                },
                "push": {
                  "particles_nb": 4
                },
                "remove": {
                  "particles_nb": 2
                }
              }
            },
            "retina_detect": true
          });
    })
})();