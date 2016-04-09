var data = {
   name : 'John Doe'
};

var template = Handlebars.compile( $('#template').html() );
$('.updates').append( template(data) );
