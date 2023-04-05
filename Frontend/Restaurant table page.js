let submitbtn = document.getElementById('submit');
let Table1 = document.getElementById('table-1');
let Table2 = document.getElementById('table-2');
let Table3 = document.getElementById('table-3');

submitbtn.addEventListener('click', storeTableDetails);

function storeTableDetails(e) {
    e.preventDefault();

    let choosePrice = document.getElementById('price').value;
    let chooseDish = document.getElementById('dish').value;
    let chooseTable = document.getElementById('table').value;

    let orderDetails = {
        choosePrice,
        chooseDish,
        chooseTable
    }
    showTableDetails(orderDetails)

    axios.post('https://crudcrud.com/api/a9083fd77dbb4c12b0a5ffdf19427f6b/orderDetails', orderDetails)
    .then((response) => {
        showTableDetails(response.data)
        console.log(response.data)
    })
}

window.addEventListener('DOMContentLoaded', () => {
    axios.get('https://crudcrud.com/api/a9083fd77dbb4c12b0a5ffdf19427f6b/orderDetails').then((response) => {
        for(let i=0; i<response.data.length; i++) {
            showTableDetails(response.data[i]);
        }
    })
})

function showTableDetails(orderDetails) {
    let li = document.createElement('li');
    li.textContent = `${orderDetails.choosePrice} - ${orderDetails.chooseTable} - ${orderDetails.chooseDish}`;

    let deletbtn = document.createElement('input');
    deletbtn.type = 'button';
    deletbtn.value = 'Delete';

    function delteTableId(tableId) {
        axios.delete(`https://crudcrud.com/api/a9083fd77dbb4c12b0a5ffdf19427f6b/orderDetails/${tableId}`)
        .then((res) => console.log(res))
    }

    li.appendChild(deletbtn);

    deletbtn.onclick = () => {
        if(orderDetails.chooseTable==='Table 1') {
            Table1.removeChild(li);
            delteTableId(orderDetails._id);
        }else if(orderDetails.chooseTable==='Table 2') {
            Table2.removeChild(li)
            delteTableId(orderDetails._id);
        }else {
            Table3.removeChild(li)
            delteTableId(orderDetails._id);
        }
    }
    if(orderDetails.chooseTable==='Table 1') {
        Table1.appendChild(li);
    }else if(orderDetails.chooseTable==='Table 2') {
        Table2.appendChild(li);
    }else {
        Table3.appendChild(li);
    }
}


