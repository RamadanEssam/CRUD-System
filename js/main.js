var nameInp = document.getElementById("ProductName");
var categoryInp = document.getElementById("ProductCategory");
var priceInp = document.getElementById("ProductPrice");
var descInp = document.getElementById("productDescription");

//var ProductList = [];
if (localStorage.getItem("productdate") == null) {
    var ProductList = [];
} else {
    var ProductList = JSON.parse(localStorage.getItem("productdate"));
}






function addpro() {
    var product = {
        name: nameInp.value,
        Cat: categoryInp.value,
        Price: priceInp.value,
        Des: descInp.value
    };

    if ((nameInp.value == "") || (categoryInp.value == "") || (priceInp.value == "")) {
        alert("Value is null")
    } else {

        ProductList.push(product);
        localStorage.setItem("productdate", JSON.stringify(ProductList))
        console.log(ProductList);

        displaypro();

        clearform();
    }



}
displaypro();

function displaypro() {

    var trs = "";

    for (var i = 0; i < ProductList.length; i++) {

        trs += `<tr><td>${i}</td><td class="border_r">${ProductList[i].name}</td> <td class="border_r">${ProductList[i].Cat}</td> <td>${ProductList[i].Price}</td> <td>${ProductList[i].Des}</td> <td><button class="btn btn-danger" onclick="delet(${i})") >Delete</button></td> <td><button class="btn btn-warning" onclick="update(${i})">Update</button></td></tr> `;
    }

    console.log(trs);
    document.getElementById("tbody").innerHTML = trs;

}


function delet(x) {

    ProductList.splice(x, 1);
    displaypro();
    localStorage.setItem("productdate", JSON.stringify(ProductList))
}

var addBtn = document.getElementById("addbtn");

function update(idex) {
    nameInp.value = ProductList[idex].name;
    categoryInp.value = ProductList[idex].Cat;
    priceInp.value = ProductList[idex].Price;
    descInp.value = ProductList[idex].Des;

    addBtn.innerHTML = "Update Product";
    addBtn.onclick = function() {
        ProductList[idex].name = nameInp.value;
        ProductList[idex].Cat = categoryInp.value;
        ProductList[idex].Price = priceInp.value;
        ProductList[idex].Des = descInp.value;

        localStorage.setItem("productdate", JSON.stringify(ProductList));
        displaypro();
        addBtn.innerHTML = "add Product";

        addBtn.onclick = addpro;

        clearform();
    }

}

var searchInp = document.getElementById("searchInp");

function search() {
    var trs = "";
    for (let i = 0; i < ProductList.length; i++) {
        if (ProductList[i].name.toLowerCase().includes(searchInp.value.toLowerCase())) {

            trs += `<tr><td>${i}</td><td class="border_r">${ProductList[i].name.replace(searchInp.value.toLowerCase(),`<span style='background-color: yellow;'> ${searchInp.value.toLowerCase()} </span>`)}</td> <td class="border_r" >${ProductList[i].Cat}</td> <td>${ProductList[i].Price}</td> <td>${ProductList[i].Des}</td> <td><button class="btn btn-danger" onclick="delet(${i})") >Delete</button></td> <td><button class="btn btn-warning" onclick="update(${i})">Update</button></td></tr> `;

        }

        document.getElementById("tbody").innerHTML = trs;

        console.log("${ProductList[i].name}")
    }
}


function clearform() {
    if ((nameInp.value == "") && (categoryInp.value == "") && (priceInp.value == "") && (descInp.value == "")) {
        alert("Value is null")
    } else {
        nameInp.value = "";
        categoryInp.value = "";
        priceInp.value = "";
        descInp.value = "";
    }
}