

document.addEventListener("DOMContentLoaded", () => {

    let diagram = document.querySelector('.diagram');
    let elMyBalance = document.querySelector('.balance-box .balance');
    let elTotalThisMonth = document.querySelector('.bottom-balance-box .balance');
    let elPercent = document.querySelector('.percent');

    let myBalance = 200;
    let totalLastMonth = 154;

    let json = `[
        {
          "day": "mon",
          "amount": 17.45
        },
        {
          "day": "tue",
          "amount": 34.91
        },
        {
          "day": "wed",
          "amount": 52.36
        },
        {
          "day": "thu",
          "amount": 31.07
        },
        {
          "day": "fri",
          "amount": 23.39
        },
        {
          "day": "sat",
          "amount": 43.28
        },
        {
          "day": "sun",
          "amount": 25.48
        }
    ]`;


    let array = JSON.parse(json);
    let obj = array.reduce((hSum, current) => {
        if(hSum.maxHeight > current.amount) return  {
                                                        maxHeight: hSum.maxHeight, 
                                                        totalThisMonth: hSum.totalThisMonth + current.amount
                                                    };
        else return {
                        maxHeight: current.amount, 
                        totalThisMonth: hSum.totalThisMonth + current.amount
                    };
    }, {maxHeight: array[0].amount, totalThisMonth: 0});
    
    let {maxHeight, totalThisMonth} = obj;



    elMyBalance.innerHTML = "$" + myBalance;
    elTotalThisMonth.innerHTML = totalThisMonth.toFixed(2);
    elPercent.innerHTML = ((totalThisMonth - totalLastMonth) > 0 ? "+" : "") + 
                                ((totalThisMonth - totalLastMonth) / 100).toFixed(2) 
                                                                                    + "%"; 



    let heightArray = array.map((el) => {
        if(maxHeight == 0) return 20;
        return el.amount / maxHeight * 150;
    })



    let innerHTMLDiagram = "";
    for(let i = 0; i < array.length; i++) {
        innerHTMLDiagram = innerHTMLDiagram + `
        <div class="column-box">
            <div class="popup-hover"><div>$${array[i].amount.toFixed(2)}</div></div>
            <div style="height: ${Math.max(parseFloat(heightArray[i].toFixed(2)), 20)}px; background: ${maxHeight == array[i].amount ? '#76B5BC' : ""};" class="column"></div>
            <div class="label">${array[i].day}</div>
        </div>
        `;
    }
    diagram.innerHTML = innerHTMLDiagram;


    
    let arrayColumns = document.querySelectorAll('.column');
    for(let i = 0; i < array.length; i++) {
        (function(index) {
            arrayColumns[index].addEventListener('mouseover', function(e) {
                e.preventDefault();
                e.target.parentElement.querySelector('.popup-hover').style.display = 'flex';
            });

            arrayColumns[index].addEventListener('mouseout', function(e) {
                e.preventDefault();
                e.target.parentElement.querySelector('.popup-hover').style.display = 'none';
            });
        })(i);
    }
    
});