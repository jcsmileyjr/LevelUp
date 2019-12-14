import goals from '../data/goals.js';

/*
  export function getData(){
    try {
        const value = AsyncStorage.getItem('userGoals');
        return value;
      } catch(error) {
        console.log(error);
      }
  }

  export function initialSetData(){
    try {
        if(goals === null){
            AsyncStorage.setItem("userGoals",JSON.stringify(goals));
        }
    }catch (error){
        console.log(error)
    }
    
  }
*/

const initialSetData = async () => {
    try {
      const test = this.getData();
      if(test === null){
        await AsyncStorage.setItem("userGoals",JSON.stringify(goals));
      }
    }catch (error){
      console.log(error);
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userGoals');
      return value;
    } catch(error) {
      console.log(error);
    }
  }

  export {getData, initialSetData};
  
  