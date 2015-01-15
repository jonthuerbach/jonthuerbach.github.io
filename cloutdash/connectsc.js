// initialize client with app credentials
    
function connectSC() {  
  SC.initialize({
    client_id: '3d87109b020fef7dce6e3f25573c3c7c',
    redirect_uri: 'http://jonthuerbach.github.io/cloutdash/callback.html'
  });

  // initiate auth popup
  SC.connect(function() {
    SC.get('/me', function(me) { 
      alert('Hello, ' + me.username); 
    });
  });
}