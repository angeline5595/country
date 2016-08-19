$(function() {
    $('#searchbtn').on('click', function() {
        var detail = $('#search').val();
        var temp;
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/studentdata?gender=' + detail,
            success: function(data) {

                //console.log("Success", data);
                 $('#results').html('<tr> <th>ID</th> <th>Name</th> <th>Gender</th> <th>Age</th> <th>phone</th>  <th>Course</th> <th>email</th> <th>Address</th></tr> ');
                	$.each(data, function(i, item) {
                    temp = '';
                    temp += '<tr> <td>' + item.id + ' </td><td>' + item.name + ' </td> <td> ' + item.gender + ' </td> <td> ' + item.age + ' </td> <td> ' + item.phone + ' </td><td> ' + item.Course + ' </td> <td> '+ item.email+' </td> <td> '+ item.address+' </td> </tr>';
                     $('#results').append(temp);
                     $('#results').append('<botton type="submit" class="btn btn-default">Update</button>');
                    });
                   

               

            },
            error: function() {
                console.log("error");
            }
        });

    });
});
