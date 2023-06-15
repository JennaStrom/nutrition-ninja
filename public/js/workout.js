
// https://share.balsamiq.com/c/4CSS9Qs6W1Bg4ZZLaoDwwm.png


const apiNutritionIx = 'b390e29a58c8183e487d273f4488f5ef'
const appId = '85d6555d'

const apinewNinja = 'YnF77DgeIzx4abs3C/4mFw==V5wEdGttiBzNk6iO'


const startBtn = document.querySelector('#startButton') 

 startBtn.addEventListener('click', async ()=> {

    try {
       const res = await fetch('/workouts')
    const data = await res.text() 

    document.getElementById('workoutFormContainer').innerHTML = data
    }
    catch (err) {
        // use modal for the error and to inform user to try again (message)
    }

 })

    const form = document.getElementById('workoutForm')

    form.addEventListener('submit', (event)=> {
        event.preventDefault()
        workOut2()
    })

       const workOut2 = async ()=>{
            
try {
    
          const formData = new FormData(form)    
          const jsonBody = Object.fromEntries(formData)
         
           await fetch('workouts', {
                method: "POST",
            headers:  {
                // 'x-Api-key': apinewNinja,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonBody)
        })
        // if(response.ok){
        //     window.location.href = '/dashboard'
        // } 
}
catch (err) {
    console.log('Network error encountered', err)
}
        }





        



























































        





















        

