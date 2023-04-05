let submitbtn = document.getElementById('submit');
let Table1 = document.getElementById('table-1');
let Table2 = document.getElementById('table-2');
let Table3 = document.getElementById('table-3');

submitbtn.addEventListener('click', storeTableDetails);

function storeTableDetails(e) {
    e.preventDefault();

    let price = document.getElementById('price').value;
    let dish = document.getElementById('dish').value;
    let table = document.getElementById('table').value;

    let orderDetails = {
        price,
        dish,
        table
    }
    // showTableDetails(orderDetails)

    axios.post('http://localhost:5000/order/add-order', orderDetails)
    .then((response) => {
        showTableDetails(response.data.newOrderDetail)
        console.log(response.data)
    }).catch((err) => {
        document.body.innerHTML = document.body.innerHTML+`<h4>Something went Wrong</h4>`;
        console.log(err);
    })
}

window.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:5000/order/get-orders').then((response) => {
        for(let i=0; i<response.data.allOrderDetails.length; i++) {
            showTableDetails(response.data.allOrderDetails[i]);
        }
    }).catch((error) => console.log(error));
})

function showTableDetails(orderDetails) {
    let li = document.createElement('li');
    li.textContent = `${orderDetails.price} - ${orderDetails.dish} - ${orderDetails.table}`;


    let deletbtn = document.createElement('input');
    deletbtn.type = 'button';
    deletbtn.value = 'Delete';

    function delteTableId(tableId) {
        axios.delete(`http://localhost:5000/order/delete-order/${tableId}`)
        .then((res) => console.log(res))
    }

    li.appendChild(deletbtn);

    deletbtn.onclick = () => {
        if(orderDetails.table==='Table 1') {
            Table1.removeChild(li);
            delteTableId(orderDetails.id);
        }else if(orderDetails.table==='Table 2') {
            Table2.removeChild(li)
            delteTableId(orderDetails.id);
        }else {
            Table3.removeChild(li)
            delteTableId(orderDetails.id);
        }
    }
    if(orderDetails.table==='Table 1') {
        Table1.appendChild(li);
    }else if(orderDetails.table==='Table 2') {
        Table2.appendChild(li);
    }else {
        Table3.appendChild(li);
    }
}


