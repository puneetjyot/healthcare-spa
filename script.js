// var db = null;

// connectToDB = function() {
//   db = window.openDatabase("Cmpe280", "1.0", "Cmpebase", 3 * 1024 * 1024);
// };

// createTable = function() {
//   db.transaction(function(tx) {
//     tx.executeSql(
//       "CREATE TABLE IF NOT EXISTS patient_details (Name TEXT, Age INTEGER, Gender TEXT, Photo VARBINARY, Medics TEXT, Notes TEXT)",
//       [],
//       function() {
//         alert("patient_details database created successfully!");
//       },
//       function(tx, error) {
//         alert(error.message);
//       }
//     );
//   });
// };

insertDemo = function(Name, Age, Gender) {
  localStorage.setItem("Name", Name);
  localStorage.setItem("Age", Age);
  localStorage.setItem("Gender", Gender);
  //localStorage.setItem('image', img);
};

insertVitals = function(Medics, Notes) {
  var Name = localStorage.getItem("Name");
  var Age = localStorage.getItem("Age");
  var Gender = localStorage.getItem("Gender");
  var img = localStorage.getItem("photo");
  var med=Medics;
  var notes=Notes;
  var data1 = {
    Name,
    Age,
    Gender,
    img,
    med,
    notes
  }
  // db.transaction(function(tx) {
  //   tx.executeSql(
  //     "INSERT INTO patient_details (Name, Age, Gender, Photo, Medics, Notes) VALUES (?, ?, ?, ?, ?, ?)",
  //     [Name, Age, Gender, img, Medics, Notes],
  //     function() {
  //       alert("The note could be saved.");
  //     }
  //   );
  // });
  $.ajax({
    url: 'http://localhost:3000/patient',
    type: 'POST',
    data: data1,
    dataType: 'JSON',
    success:function(response)
    {
      console.log(response)
      if (response.msg === '') {
        // $('#form2 textarea').val('');
        // $('#form2 input').val('');
        // console.log('To populate');
      
      alert('Error: ', response.msg);
        // console.log('Populated');
      } else {
        fetchData();
      }
    }
   })
  //.done(function(response) {
  //   // console.log('Before if');
  //   if (response.msg === '') {
  //     // $('#form2 textarea').val('');
  //     // $('#form2 input').val('');
  //     // console.log('To populate');
  //   fetchData();
  //     // console.log('Populated');
  //   } else {
  //     alert('Error: ', response.msg);
  //   }
  // });
};

fetchData = function() {
 
      $.getJSON('http://localhost:3000/patient/list', (data) => {
        console.log(data)
        var i = 0;
        $.each(data, () => { 
       
          var Name = data[i].name;
          var Age =  data[i].age;
          var Gender = data[i].gender;
          var Medics = data[i].medics;
          var Notes = data[i].notes;
          var img = data[i].image
          //console.log(img);
          i=i+1
          $("#table_details").append(`<tr><td>${Name}</td>
                              <td>${Age}</td>
                              <td>${Gender}</td>
	                            <td><img src=${img} style="width:30px; height:50px"></td>
                              <td>${Medics}</td>
                              <td>${Notes}</td></tr>`);
        })
      }
    );
};

$(function() {
  // connectToDB();
  // createTable();
  fetchData();

  $("#save").click(function() {
    var Name = $("#firstname").val();
    var Age = $("#age").val();
    var Gender = $("#gender")
      .find(":selected")
      .val();

    insertDemo(Name, Age, Gender);
  });

  $("#save_vitals").click(function() {
    var Medics = $("#pmed").val();
    var Notes = $("#pnotes").val();
    insertVitals(Medics, Notes);
  });
});
