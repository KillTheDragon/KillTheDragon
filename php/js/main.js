$(document).ready(function() {
    var player_health_max = 10;
    var dragon_health_max = 100;
    
    var player_health_curr = 10;
    var dragon_health_curr = 100;
    
    var update_health = function() {
        
        var player_font = function() {
            if (player_health_curr / 2 < 15) {
                return 15;
            } else if (player_health_curr / 2 > 50) {
                return 50;
            } else {
                return player_health_curr / 2;
            }
        };
        
        var dragon_font = function() {
            if (dragon_health_curr / 2 < 15) {
                return 15;
            } else if (dragon_health_curr / 2 > 50) {
                return 50;
            } else {
                return dragon_health_curr / 2;
            }
        };
    
        $(".player_health").html("<h3 style=\"font-size:"+ player_font() + "px\">You: " + player_health_curr + "/" + player_health_max + "</h3>");
        $(".dragon_health").html("<h3 style=\"font-size:"+ dragon_font() + "px\">Dragon: " + dragon_health_curr + "/" + dragon_health_max + "</h3>");
    };
    
    update_health();
    
    $(".fight_screen").hide();
    
    $(".ready_button").click(function() {
        $(".ready_screen").hide();
        $(".fight_screen").show();
        $(".attack_button").show();
        $("p.run_or_fight").show();
    });
    
    $(".run_button").click(function() {
        $(".fight_screen").hide();
        $("p.attack_result").hide();
        $(".ready_screen").show();
    });
    
    // Calculate hit or miss.
    // Update p.attack_result with result.
    // Hide .attack_button if miss.
    $(".attack_button").click(function() {
        var result = Math.random() * 5;
        console.log(result);
        var damage = Math.ceil(result) * 10;
        
        if (result > 4) {
            $("p.run_or_fight").hide();
            $("p.attack_result").html("Sorry you missed... time to run!");
            $("p.attack_result").show();
            $(".attack_button").hide();
        } else if (result > 0) {
            $("p.run_or_fight").hide();
            $("p.attack_result").show();
            $("p.attack_result").html("You did " + damage + " damage... Continue?");
            dragon_health_curr -= damage;
            update_health();
            if (dragon_health_curr <= 0) {
                dragon_health_curr = 0;
                update_health();
                $(".attack_button").hide();
                $(".run_button").hide();
                $("p.attack_result").html("You did " + damage + " damage and... <br />Killed The Dragon!");
            }
            console.log("dragon health: " + dragon_health_curr);
        } else {
            console.log("Something went wrong main.js[26]");
        }
    });
});