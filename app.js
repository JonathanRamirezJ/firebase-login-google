// Instancia del provedor del servicio
const provider = new firebase.auth.GoogleAuthProvider();

$('#login').click(function() {
    firebase.auth()
      .signInWithPopup(provider)
      .then(function(result){
        console.log(result.user);
        const token = result.credential.accessToken;
        console.log(token);
        // $('#login').hide();
        // $('#root').append("<img src='"+result.user.photoURL+"'/>")
        saveData(result.user);
      });
});

function saveData(user) {
  const usuario = {
    uid: user.uid,
    nombre: user.displayName,
    email: user.email,
    photo: user.photoURL
  }
  firebase.database().ref('telmex/' + user.uid ).set(usuario);
}

$('#save').click(function(){
  firebase.database().ref("telmex")
    .set({
      nombre: "Jonathan",
      edad: "23",
      sexo: "H",
    })
    console.log('datos guardados');
});

// Escucha en la base de datos cuando se agrega un valor a la rama 'telmex'
firebase.database().ref('telmex').on('child_added', function(s){
  const user = s.val();
  $('#root').append("<img src='"+user.photo+"' width='100px'/>");
});
