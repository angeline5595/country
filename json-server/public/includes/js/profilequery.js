$(function() {
    $('#next').hide();
    $('#prev').hide();
    var rec;
    var temp = $('#temp').html();
    var $results = $('#results');
     var $addForm = $('#addForm');

    function addDetails(item) {
        $results.append(Mustache.render(temp, item));
    }

    $('#searchb').on('click', function() {
        var detail = $('#search').val();
        if (detail == "") {
            alert("fill");
        } else {
            var temp;
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/studentdata?id=' + detail,
                success: function(data) {
                    $results.html('');
                    $results.html('<tr> <th>ID</th> <br> <th>NAME</th> <th>GENDER</th> <th>AGE</th> <th>PHONE</th>  <th>COURSES</th> <th>EMAIL</th> <th></th><th></th></tr> ');
                    $.each(data, function(i, item) {
                        addDetails(item);
                    });

                },
                error: function() {
                    console.log("error");
                }
            });
        }
    });

    var page = 0;
    $('#rebtn').on('click', function() {


        var temp = $('#temp').html();

        if (page == 0) {
            $("#prev").prop('disabled', true);
        }
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/studentdata?_start=' + page + '&_limit=10',
            success: function(data) {

                $('#next').show();
                $('#prev').show();
                $results.html('');
                $results.html('<tr> <th align="center">ID</th> <br> <th align="center">NAME</th> <th align="center">GENDER</th> <th align="center">AGE</th> <th align="center">PHONE</th>  <th align="center">COURSES</th> <th align="center">EMAIL</th> <th></th><th></th></tr> ');
                $.each(data, function(i, item) {
                    addDetails(item);
                });
            },
            error: function() {
                console.log("error");
            }
        });
    });
    $('#next').on('click', function() {
        var temp = $('#temp').html();
        page = page + 10;
        if (page > 0) {
            $("#prev").prop('disabled', false);
        }
        if (page == 40000) {
            $("#next").prop('disabled', true);
        }
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/studentdata?_start=' + page + '&_limit=10',
            success: function(data) {
                $results.html('');
                $results.html('<tr> <th>ID</th> <br> <th>NAME</th> <th>GENDER</th> <th>AGE</th> <th>PHONE</th>  <th>COURSES</th> <th>EMAIL</th> <th></th><th></th></tr> ');
                $.each(data, function(i, item) {
                    addDetails(item);
                });
            }

        });
    });
    $('#prev').on('click', function() {
        var temp = $('#temp').html();
        page = page - 10;
        if (page < 10) {
            $("#prev").prop('disabled', true);
        }
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/studentdata?_start=' + page + '&_limit=10',
            success: function(data) {
                $results.html('');
                $results.html('<tr> <th>ID</th> <br> <th>NAME</th> <th>GENDER</th> <th>AGE</th> <th>PHONE</th>  <th>COURSES</th> <th>EMAIL</th> <th></th><th></th></tr> ');
                $.each(data, function(i, item) {
                    addDetails(item);
                });
            }
        });
    });
   

    $addForm.on('submit', function(event) {
        

        event.preventDefault();



   

        
    

        console.log("clicked");
        var $id = $('#id');
        var $name = $('#name');
        var $gender = $('#gender');
        var $age = $('#age');
        var $phone = $('#phone');
        var $Course = $('#course');
        var $email = $('#email');
        var record = {
            id: $id.val(),
            name: $name.val(),
            gender: $gender.val(),
            age: $age.val(),
            phone: $phone.val(),
            Course: $Course.val(),
            email: $email.val()
        };
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/studentdata',
            data: record,
            success: function(Details) {
                $results.html('');
                $results.html('<tr> <th>ID</th> <br> <th>NAME</th> <th>GENDER</th> <th>AGE</th> <th>PHONE</th>  <th>COURSES</th> <th>EMAIL</th> <th></th><th></th></tr> ');
                addDetails(Details);
                console.log("added");
                $('#addForm')[0].reset();

            },
            error: function() {
                console.log("error");
            }
        });
    
});

 

    $results.delegate('#debtn', 'click', function() {
        var $tr = $(this).closest('tr');
         console.log("gusyau");
        var id = $(this).attr('data-id');
        console.log(id);
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/studentdata/' + id,
            success: function() {

                $tr.fadeOut(300, function() {
                    $(this).remove();
                });
            },
            error: function() {
                console.log("error");
            }
        });
    });

    $results.delegate('#update', 'click', function() {

           













        var $tr = $(this).closest('tr');
        $tr.find('input.name').val($tr.find('span.na').html());
        $tr.find('input.age').val($tr.find('span.ag').html());
        $tr.find('input.gender').val($tr.find('span.ge').html());

        $tr.find('input.phone').val($tr.find('span.ph').html());

        $tr.find('input.Course').val($tr.find('span.co').html());

        $tr.find('input.Email').val($tr.find('span.em').html());
        $tr.find('td').addClass('edit');
    });

    $results.delegate('#save', 'click', function() {




   
        var $tr = $(this).closest('tr');
        var record = {
            name: $tr.find('input.name').val(),
            gender: $tr.find('input.gender').val(),
            age: $tr.find('input.age').val(),
            phone: $tr.find('input.phone').val(),
            Course: $tr.find('input.Course').val(),
            email: $tr.find('input.Email').val()
        };
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:8080/studentdata/' + $(this).attr('data-id'),
            data: record,
            success: function(Details) {
                $tr.find('span.na').html(record.name);
                $tr.find('span.ge').html(record.gender);
                $tr.find('span.ag').html(record.age);
                $tr.find('span.ph').html(record.phone);
                $tr.find('span.co').html(record.Course);
                $tr.find('span.em').html(record.email);
                $tr.find('td').removeClass('edit');

            },
            error: function() {
                console.log("error");
            }
        });
    
    
  });
  $results.delegate('#cancel', 'click', function() {
        var $tr = $(this).closest('tr');
        $tr.find('td').removeClass('edit');
    });

});
