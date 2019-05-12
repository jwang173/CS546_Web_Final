function openmenu(mID) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/menu/' + mID,
        success: function (data) {
            $('body').html(data);
            console.log(data);
        }
        
    });
}