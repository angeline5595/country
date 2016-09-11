function myFunction() {
   var e = document.getElementById("select");
   var name = e.options[e.selectedIndex].text;
   var e3 = document.getElementById("two");
   $.ajax({
                type:'GET',
                url: 'http://localhost:8080/countrydata?name=' + name,
                
            success: function(data) {
                document.getElementById("b").innerHTML='STATES IN '+name;
                temp = '';
                temp +=data[0].states;
                e3.innerHTML=temp;                
            }
        });
}