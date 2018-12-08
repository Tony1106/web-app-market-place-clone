$(document).ready(function() {
  $("#more-info-menu").click(function() {
    onClickMenu();
  });

  $(".dropdown-menu a").click(function() {
    var dropdownvalue = parseInt(this.dataset.value);

    var innerText;
    switch (dropdownvalue) {
      case 1:
        innerText = "Xe cộ";
        break;
      case 2:
        innerText = "Đồ điện tử";
        break;
      case 3:
        innerText = "Nội ngoại thất";
        break;
      case 4:
        innerText = "Thời Trang";
        break;
      case 5:
        innerText = " Mẹ và bé";
        break;
      case 6:
        innerText = "Thú cưng";
        break;
      case 7:
        innerText = "Việc làm";
        break;
      case 8:
        innerText = "Dịch Vụ";
        break;
    }
    $("#category").html(innerText);
  });
  var file;
  $("#fileUpload").change(function(e) {
    file = e.target.files[0];
    console.log(file, "file path");
  });

  $("#submit").click(function() {
    event.preventDefault();
    const title = $("#title").val();
    const description = $("#description").val();
    const localSuburb = $("#localSuburb").val();
    const data = {
      title,
      description,
      localSuburb
    };

    //function upload to firebase
    asyncUpload(file, data);
  });
});

function asyncUpload(file, data) {
  var itemID = createItemID();
  uploadFile(file, itemID)
    .then(url => {
      console.log(url, "url");
      data.imageURL = url;
      uploadToDatabase(data, itemID);
    })
    .then(() => window.history.push("/"))
    .catch(err => {
      console.log(err);
    });
}

function uploadFile(file, itemID) {
  var imageID = createItemID();

  var ref = firebase.storage().ref("Items/" + itemID + "/" + imageID);
  return ref
    .put(file)
    .then(async function(snapshot) {
      let url = await snapshot.ref.getDownloadURL();
      var obj = { [imageID]: url };
      return obj;
    })
    .catch(err => {
      console.log(err);
    });
}

function createItemID() {
  var ref = firebase.database().ref("Items");
  return ref.push().key;
}

function uploadToDatabase(data, itemID) {
  var ref = firebase.database().ref("Items/" + itemID);
  ref.set(data);
}

function onClickMenu() {
  $(".collasp-menu").toggleClass("hide");
}
