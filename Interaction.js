let weight = null;
let height=null;
let goal = null;
let Bench = null;
let Squat = null;
let Rows = null;
let Neck=null;
let Waist = null;
let Age=null
let activity=null;
function SubmitData(){
    weight=parseFloat(document.getElementById("Weight").value)
    height=parseFloat(document.getElementById("Height").value)
    goal=document.getElementById("Goal").value
    Bench = parseFloat(document.getElementById("Bench").value)
    Squat = parseFloat(document.getElementById("Squat").value)
    Rows = parseFloat(document.getElementById("Rows").value)
    Neck = parseFloat(document.getElementById("Neck").value)
    Waist = parseFloat(document.getElementById("Waist").value)
    Age = parseFloat(document.getElementById("Age").value)
    activity=document.getElementById("Activity").value
    BMR=66+(6.23*weight)+(12.7*height)-(6.8*Age);
    let activityFactor = 1.2;
    if (activity === "Not-Active") {
        activityFactor = 1.2;
    } else if (activity === "Moderately-Active") {
        activityFactor = 1.375;
    } else if (activity === "Very-Active") {
        activityFactor = 1.55;
    }
    const TDEE = BMR * activityFactor;
    let calorieTarget = TDEE;
    if (goal === "Lean") {
        calorieTarget = TDEE - 500; 
    } else if (goal === "Bulk") {
        calorieTarget = TDEE + 300; 
    } else if (goal === "Maintain") {
        calorieTarget = TDEE;
    }

    if (goal === "Lean") {
        Protein = Math.round(weight * 0.9);
        Carbs   = Math.round((calorieTarget - Protein*4 - (weight*0.3*9)) / 4);
        Sodium  = 2200;
    } else if (goal === "Bulk") {
        Protein = Math.round(weight * 1.0);
        Carbs   = Math.round((calorieTarget - Protein*4 - (weight*0.4*9)) / 4);
        Sodium  = 2800;
    } else if (goal === "Maintain") {
        Protein = Math.round(weight * 0.8);
        Carbs   = Math.round((calorieTarget - Protein*4 - (weight*0.35*9)) / 4);
        Sodium  = Math.round(weight * 5);
    }
    let bfp="N/A";
    if(Waist>Neck && height >0){
        const log10 = x => Math.log(x) / Math.LN10;
        const bfp =86.010 * log10(Waist - Neck) - 70.041*log10(height)+36.76;
        document.getElementById("bfp-output").innerText = bfp.toFixed(1) + " %";

    }else{
        document.getElementById("bfp-output").innerText = "Invalid Input";
    }
    
    

    document.getElementById("Sodium-output").innerText = Sodium + " mg";
    document.getElementById("Carbs-output").innerText = Carbs + " g";
    document.getElementById("Protein-output").innerText = Protein + " g";
    document.getElementById("Sugar-output").innerText = (weight * 0.3).toFixed(1)+" g";
    document.getElementById("Weight-output").innerText = weight + " lbs";
    document.getElementById("Vitamins-output").innerText = "Daily Multivitamins";


    document.getElementById("Bench-output").innerText = Bench + " lbs";
    document.getElementById("Squat-output").innerText = Squat + " lbs";
    document.getElementById("Rows-output").innerText = Rows + " lbs";

    document.getElementById("form-screen").style.display ="none";
    document.getElementById("results-screen").style.display = "flex";



    console.log(weight, height,goal)
    
}
const vitaminData = {
        "vitamin c":{ daily: 90, taken:0, unit:"mg"},
        "vitamin d":{ daily: 20, taken:0, unit:"mcg"},
        "vitamin b12":{ daily: 2.4, taken:0, unit:"mcg"},
        "vitamin a":{ daily: 900, taken:0, unit:"mcg"},
        "vitamin e":{ daily: 15, taken:0, unit:"mg"},


    };
function logVitamin(vitaminName){
    const amountInputId = vitaminName.replace(/\s/g, "-") + "-amount";
    const amount = parseFloat(document.getElementById(amountInputId).value);

    if(isNaN(weight) || isNaN(height)){
        alert("Please fill out all required fields.");
        return
    }
    if(!vitaminData[vitaminName]){
        alert("Vitamin Not Found!");
        return
    }if(isNaN(amount) || amount<=0){
        alert("Please enter a valid amount");
        return
    }

    vitaminData[vitaminName].taken +=amount;
    const remaining = Math.max(0, vitaminData[vitaminName].daily - vitaminData[vitaminName].taken);
    document.getElementById(vitaminName.replace(/\s/g,"-") + "-taken").innerText = vitaminData[vitaminName].taken.toFixed(2) + " " + vitaminData[vitaminName].unit;
    document.getElementById(vitaminName.replace(/\s/g,"-") + "-left").innerText = remaining.toFixed(2) + " " + vitaminData[vitaminName].unit;
}
