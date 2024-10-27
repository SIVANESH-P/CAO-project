//main function
function main(){
    let val1 = document.getElementById("dividend").value;
    let val2 = document.getElementById("divisor").value;

    //validating user input before calculation
    if(val1 != "" && val2 != "" && Number(val2) > 0 && Number(val1) >= 0){
        restoringDivision();
    }
}


function restoringDivision(){

    //User input is converted from integer to binary
    let Q = Number(document.getElementById("dividend").value).toString(2);
    let M = Number(document.getElementById("divisor").value).toString(2);

    //Divisor should contain one bit extra than dividend
    let len = Q.length + 1;
    M = M.padStart(len,"0");
    
    //Initial values of Accumulator(A) and count
    let A = "";
    A = A.padStart(len,"0");
    let count = Q.length;

    // Clear the table for a new run
    const tableBody = document.getElementById("solutionTable").querySelector("tbody");
    tableBody.innerHTML = ""; // Clear previous results

    let comments = "Initial Values"
    appendRowToTable(comments,M, A, Q, count); //Appending initial values to the table

    while(count > 0){

        //Step 1: Left Shift A and Q
        comments = "Left-Shift A & Q";
        A = A.slice(1) + Q[0];
        Q = Q.slice(1) + "_";
        appendLeftShift(comments, A, Q);

        //Step 2: Add A = A - M
        comments = "A = A - M";
        M_Comp = TwosComplement(M);
        let newA = add(A,M_Comp);
        
        //Decision is made based on MSB of A (i.e) A[0]
        if(newA[0] === '1'){
            comments = "A - M <br>Q[0] ← 0 <br>A is Restored";
            Q = Q.slice(0,Q.length-1) + "0";
            A = add(newA, M);
            count--;
            appendRowToTable(comments,M, A, Q, count);
        } else {
            comments = "A - M <br>Q[0] ← 1";
            A = newA;
            Q = Q.slice(0,Q.length - 1) + "1";
            count--;
            appendRowToTable(comments,M, A, Q, count);
        }    
    }
    
    document.getElementById("result").innerHTML = "Quotient: " + Q + " Remainder: " + A;
}

//function to add two binary digits
function add(A,M_comp){
    let num1 = parseInt(A,2);
    let num2 = parseInt(M_comp,2);
    let ans = (num1 + num2).toString(2);
    
    //If the answer contains a carry, it is ignored
    if(ans.length > A.length){
        ans = ans.slice(1,A.length + 1);
    }
    return ans;
}

//function to find the 2's Complement
function TwosComplement(binary){
    let onesComplement = binary.split("").map(bit => bit === "0" ? 1 : 0).join("");
    let twosComplement = (parseInt(onesComplement,2) + 1).toString(2);

    twosComplement = twosComplement.padStart(binary.length,"0");
    if(twosComplement.length > binary.length){
        twosComplement = twosComplement.slice(1,twosComplement.length + 1);
    }

    return twosComplement;
}

//function to add a row to the table
function appendRowToTable(comments,M, A, Q, count) {
    const tableBody = document.getElementById("solutionTable").querySelector("tbody");

    // Create a new row
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${comments}</td>
        <td>${M}</td>
        <td>${A}</td>
        <td>${Q}</td>
        <td>${count}</td>
    `;

    // Append the row to the table body
    tableBody.appendChild(row);
}

//function to add a row to the table
function appendLeftShift(comments, A, Q) {
    const tableBody = document.getElementById("solutionTable").querySelector("tbody");

    // Create a new row
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${comments}</td>
        <td></td>
        <td>${A}</td>
        <td>${Q}</td>
        <td></td>
    `;
    // Append the row to the table body
    tableBody.appendChild(row);
}