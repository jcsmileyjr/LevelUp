import goals from '../data/goals.js';
import { AsyncStorage } from 'react-native';
//NONE OF THIS IS BEING USED. MAY BE USED IN THE FUTURE. NOT SURE WHY IT DON'T WORK
const initialSetData = async () => {
    try {
      const value = await AsyncStorage.getItem('userGoals');
      if(value === null){
        await AsyncStorage.setItem("userGoals",JSON.stringify(goals));
        return goals;
      }else{
        //console.log(JSON.parse(value));
        return JSON.parse(value);
      }
    }catch (error){
      console.log(error);
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userGoals');
      //console.log("getData's value " + value);
      return value;
    } catch(error) {
      console.log(error);
    }
  }

  const getMilestones = async () =>{
      const listOfGoals = await getData();
      const winner = {};
      if(listOfGoals !== null){
        const currentGoalID = await AsyncStorage.getItem('currentGoal');
        //console.log("getMilestones id " + currentGoalID);
        if(currentGoalID !== null){
          const list = JSON.parse(listOfGoals);
          //console.log(list);
          const steps = list.filter(function(goal, index){
            //console.log(goal.goal + " " + index);
            if(parseInt(currentGoalID) === index){
              console.log("goal is " + goal.milestones);
              //const test = goal;
              //return goal;
              return goal;
            }else{
              return null;
            }          
              
          });
          //console.log(steps);
          return steps;
        }
      }else {
        console.log("goals is null")
      }

  }

  //Do not work, not sure why. Cause a error saying, "AsncStorage is not there"
  const setCurrentGoal = id => {
    AsyncStorage.setItem("currentGoal",JSON.stringify(id));
    console.log("current goal id is " + id);
  }

  export {getData, initialSetData, setCurrentGoal, getMilestones};
  
  