
  window.onload = function() {  
    $("#more-info-menu").click(function(){
      onClickMenu();
    });
    getData();
    // console.log(getData(), 'get data');
    
  };
  function onClickMenu() {
    $('.collasp-menu').toggleClass('hide');  
  }

  function getData(){
      let database = firebase.database();
      let items = database.ref('Items');
      let data;
      items.on('value', (snap) => {
        manipulateNodeTree(snap.val())
      }); 
     
  }
  function manipulateNodeTree(datas){
    const uID = Object.keys(datas);
    const href = uID.map(item=> "https://australia-handbook.firebaseapp.com/mua-ban/"+item)

    let data = Object.values(datas);
    console.log('href', href);
    for(let i = 0; i<=data.length; i++){
        console.log(i);
        
        let itemContainer = $('#item-container');
        let item = data[i];
        let {title, price, imageURL} = data[i];
        let image = Object.values(imageURL);
        let itemNode = `<li  class="item" >
        <a href=${href[i]} class="layout">
            <div class="layout-left">
                <img class="image-thumbnail" src=${image[0]} alt="">

            </div>
            <div class="layout-right">
                <h3>${title}</h3>
                <div class="ad-price">
                    <span class="price">${price} đ</span>
                </div>
            </div>
        </a>
        <div class="bottom-item">
            <div class="seller">
                <span><i class="fas fa-user-circle"></i></span>
                <span>Anh Tiến</span>
            </div>
            <div class="time-stamp">
                25 giây trước
            </div>
            <div class="location">
                Quận Gò Vấp
            </div>
        </div>
        <div class="icon-save">
            <button>
                <img src="https://static.chotot.com.vn/storage/adType/adItem/heart.png" alt="">
            </button>
        </div>
    </li>`;
    itemContainer.append(itemNode);
    }
  }