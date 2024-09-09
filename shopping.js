//database
let product = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG5pa2UlMjBibHVlfGVufDB8fDB8fHww",
    name: "Nike",
    price: 7000,
    description:
      "Nike shoe Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore harum eveniet perferendis obcaecati vel explicabo, eum beatae, eius debitis pariatur optio. Temporibus earum alias",
    type: "shoe",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Original shirt",
    price: 1500,
    description:
      "Original shirt Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore harum eveniet perferendis obcaecati vel explicabo, eum beatae, eius debitis pariatur optio. Temporibus earum alias",
    type: "shirt",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "PUMA Shoe",
    price: 4500,
    description:
      "PUMA Shoe Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore harum eveniet perferendis obcaecati vel explicabo, eum beatae, eius debitis pariatur optio. Temporibus earum alias",
    type: "shoe",
  },
];

$(document).ready(() => {
  let html = "";
  for (let i = 0; i < product.length; i++) {
    html += `<div onclick="openProductDetail(${i})" class="product-item ${
      product[i].type
    }">
                <img src="${product[i].img}" alt="">
                <p style="font-size:1.2vw;">${product[i].name}</p>
                <p style="font-size:1vw;">${numberWithCommas(
                  product[i].price
                )} THB</p>
            </div>`;
  }
  $("#productlist").html(html);
});

//แสดงผลการค้นหา
function searchSomething(elem) {
  let value = $("#" + elem.id).val();

  let html = "";
  for (let i = 0; i < product.length; i++) {
    //includes() = ตัวประกอบของคำนั้นๆหน้าคำสั่ง
    if (product[i].name.includes(value)) {
      html += `<div onclick="openProductDetail(${i})"       class="product-item ${
        product[i].type
      }">
                <img src="${product[i].img}" alt="">
                <p style="font-size:1.2vw;">${product[i].name}</p>
                <p style="font-size:1vw;">${numberWithCommas(
                  product[i].price
                )} THB</p>
            </div>`;
    }
  }
  if (html == "") {
    $("#productlist").html(`<p>Not Found Product</p>`);
  } else {
    $("#productlist").html(html);
  }
}

//แสดงผลหมวดหมู่
function searchProduct(param) {
  $(".product-item").css("display", "none");
  if (param == "all") {
    //block เป้นการแสดงผล
    $(".product-item").css("display", "block");
  } else {
    $("." + param).css("display", "block");
  }
}

//เปิดรายละเอียดสินค้า
let productindex = 0;
function openProductDetail(index) {
  productindex = index;
  console.log(productindex);
  $("#modal-Desc").css("display", "flex");
  $("#mdd-img").attr("src", product[index].img);
  $("#mdd-name").text(product[index].name);
  $("#mdd-price").text(numberWithCommas(product[index].price) + " THB");
  $("#mdd-desc").text(product[index].description);
}

//ปิดรายการสินค้า
function closeModal() {
  $(".modal").css("display", "none");
}

//เพิ่มสินค้าลงตะกร้า
let cart = [];
function addtoCart() {
  let pass = true;
  for (let i = 0; i < cart.length; i++) {
    if (productindex == cart[i].index) {
      cart[i].count++;
      pass = false;
    }
  }
  if (pass) {
    let obj = {
      index: productindex,
      id: product[productindex].id,
      name: product[productindex].name,
      price: product[productindex].price,
      img: product[productindex].img,
      count: 1,
    };
    cart.push(obj);
  }
  Swal.fire({
    icon: "success",
    title:
      "Add " +
      `<span style='color:#2b6cb8'>${product[productindex].name}</span>` +
      " To Cart",
  });

  //แสดงผลแจ้งเตือนบนตะกร้า
  $("#cartcount").css("display", "flex").text(cart.length);
}

//เปิดตะกร้าสินค้า
function openCart() {
  $("#modalcart").css("display", "flex");
  renderCart();
}

//render cart โดยฉเพราะ
function renderCart() {
  if (cart.length > 0) {
    let html = "";
    for (let i = 0; i < cart.length; i++) {
      html += `<div class="cartlist-item">
                    <div class="cartlist-left">
                        <img src="${cart[i].img}" alt="">
                        <div class="cartlist-detail">
                            <p style="font-size: 1.5vw;">${cart[i].name}</p>
                            <p style="font-size: 1.2vw;">${numberWithCommas(
                              cart[i].price * cart[i].count
                            )} THB</p>
                        </div>
                    </div>
                    <div class="cartlist-right">
                        <p onclick="deinitem('-',${i})" class="btnc">-</p>
                        <p id="countitem${i}" style="margin: 0 15px;">${
        cart[i].count
      }</p>
                        <p onclick="deinitem('+',${i})" class="btnc">+</p>
                    </div>
                </div>`;
    }
    $("#mycart").html(html);
  } else {
    $("#mycart").html("<P>Not Found Product List!!</P>");
  }
}

//ลบ เพิ่ม ไอเทม (ปุ่ม)
function deinitem(action, index) {
  if (action == "-") {
    if (cart[index].count > 0) {
      cart[index].count--;
      $("#countitem" + index).text(cart[index].count);
      numberWithCommas(
        cart[index].price - cart[index].count * cart[index].price
      );
      renderCart();
      if (cart[index].count <= 0) {
        Swal.fire({
          icon: "warning",
          title: "Are You Sure To Delete?",
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
        }).then((res) => {
          if (res.isConfirmed) {
            cart.splice(index, 1);
            renderCart();
            $("#cartcount").css("display", "flex").text(cart.length);
            if (cart.length <= 0) {
              $("#cartcount").css("display", "none");
            }
          } else {
            cart[index].count++;
            $("#countitem" + index).text(cart[index].count);
            numberWithCommas(cart[index].price * cart[index].count);
            renderCart();
          }
        });
      }
    }
  } else if (action == "+") {
    cart[index].count++;
    $("#countitem" + index).text(cart[index].count);
    numberWithCommas(cart[index].price * cart[index].count);
    renderCart();
  }
}

function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}
