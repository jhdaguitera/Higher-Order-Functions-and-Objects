// You are not permitted to change this in any way
function Student(name, major, yearInSchool, club) {
    this.name = name; // string, (e.g. "Jim", "Pam", "Michael")
    this.major = major; // string, (e.g. "Computer Science", "Art", "Business")
    this.yearInSchool = yearInSchool; // int, (e.g. 1, 2, 3, 4)
    this.club = club; // string, (e.g. "Improv", "Art")
  }



  var students = [
    new Student("Pam", "Art", 2, "Art"),
    new Student("Michael", "Business", 4, "Improv"),
    new Student("Dwight", "Horticulture", 1, "Karate"),
    new Student("Jim", "Sports Science", 2, "Guitar"),
    new Student("Angela", "Accounting", 4, "Cat"),
    new Student("Toby", "Human Resources", 3, "Photography")
  ];


    
  /* This function sorts arrays using an arbitrary comparator. You pass it a comparator 
  and an array of objects appropriate for that comparator and it will return a new array 
  which is sorted with the largest object in index 0 and the smallest in the last index*/

   //referred to website for guidance on creating sorting function passing comparator and array
  //https://stackoverflow.com/questions/36798590/sorting-automobiles-by-multiple-criteria
  function sortArr(comparator, array) {

    // your code here
      //copying existing array into a newly sorted array via slice method
      //slice method reference code I used found here:
      //https://www.w3schools.com/jsref/jsref_slice_string.asp
      var sortArr = array.slice(0,6);
    
      //delcared minimum valued element in existing array
      var minElement; 
      //declared temporary place holder used for swapping values
      var temp;

      //iterating through existing array via outer loop
      for(var i = 0; i < sortArr.length-1; i++){
          minElement = i;
          //nested inner loop that passes comparator parameter and iterates j
          for(var j = i+1; j < sortArr.length; j++){
                //comparator passed will compare the values of existent array value at j  
                //with existing array value at minimum element.                           
                //if the comparator passed is true,
              if(comparator(sortArr[j], sortArr[minElement]) == true){
              //then minElement will be replaced with j (the largest value sorted at beginning of array)
                  minElement = j;
              }
            }

              //if minimum is not i, then do bubble sort
              if(minElement != i){
                //we will swap values of sorted array to get new minimum element
                  temp = sortArr[i];
                  sortArr[i] = sortArr[minElement];
                  sortArr[minElement] = temp;
              }
          }
      return sortArr;
  }
      


  /* A comparator takes two arguments and uses some algorithm to compare them. If the first 
  argument is larger or greater than the 2nd it returns true, otherwise it returns false.
  Here is an example that works on integers*/
  function exComparator( int1, int2){
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
  }
  
  /* For all comparators if students are 'tied' according to the comparison rules then the order of 
  those 'tied' students is not specified and either can come first*/
  
  /* This compares two students based on their year in school. Sort in descending order.*/
  function yearComparator(student1, student2) {
    // your code here
    //compare school year - student1 parameter larger than student2 parameter, then true
    if (student1.yearInSchool > student2.yearInSchool){
      return true;
    } 
    

    //if the year is equal then order by school year
    else if(student1.yearInSchool == student2.yearInSchool){
      return majorComparator(student1,  student2);
    }
    
    else {
      return false;
    }
  }
  
  /* This compares two students based on their major. It should be case insensitive and 
  makes which are alphabetically earlier in the alphabet are "greater" than ones that 
  come later (from A-Z).*/
  function majorComparator(student1, student2) {
    // your code here  
    //alphabetical order of the majors will return true
    if ( student1.major < student2.major){
      return true;

  } else {
      return false;
  }
}

  
   //convert string inputs to lower case first before comparing in alphabetical order 

  /* This compares two students based on the club they're in. The ordering from "greatest" 
  to "least" is as follows: improv, cat, art, guitar, (types not otherwise listed). 
  It should be case insensitive. If two clubs are of equal type then the student who
  has the higher year in school should be "greater."*/
  function clubComparator(student1, student2) {
    // your code here

    //function returns integer
    //function that number ranks the specific club - 1 for greatest to 5 for least
    clubRank = function(clubName) {
     if(clubName.club.toLowerCase() == "improv") {
          return 5;          
      }

     else if(clubName.club.toLowerCase() == "cat") {
        return 4;          
      }

     else if(clubName.club.toLowerCase() == "art") {
      return 3;          
      }

     else if(clubName.club.toLowerCase() == "guitar") {
      return 2;          
      }

     else{ //(types not otherwise listed) 
      return 1;          
      }


    }


      //function returns boolean
      //sorting the ranks of the clubs
    if (clubRank(student1) > clubRank(student2)) {
      return true;
    } 

      //if clubs are equal then 
    if (clubRank(student1) == clubRank(student2)) {
      //calls year comparator to compare via student year in school (higher year is greater)
      return yearComparator(student1, student2);
    } 
    
    else {
      return false;
    }
  }
  
  //adding logMe to Student prototype to be able to print student objects
  //accepts boolsean parameter to determine whether or not to also print club association
  Student.prototype.logMe = function(printClub){
    //does not print club
  if(!printClub){
   console.log("(" + this.name + " - " + this.major + " - " + this.yearInSchool + ")");
} 
  else if(printClub){
    console.log("(" + this.name + " - " + this.major + " - " + this.yearInSchool + " - "
     + this.club + ")");
  }
}


 //print function passing sorted array and boolean return by comparator function
 function print(sortedArr, compBool) {
  //will print for each array value that had bool passed as true
  sortedArr.forEach(function(value) {
   value.logMe(compBool)
      });
}
  
//TEST RESULTS

  //calling the sort functions(comparator, array);  
 var sortedArrMajor = sortArr(majorComparator, students);
 var sortedArrYear = sortArr(yearComparator, students);
 var sortedArrClub = sortArr(clubComparator, students);



 console.log("******************************************************************************")

console.log("The students sorted by major in school are:");
print(sortedArrMajor, false);

console.log("******************************************************************************");
 
console.log("The students sorted by year are:");
print(sortedArrYear, false);

console.log("******************************************************************************");

//printed the clubs
console.log("The students sorted by club affiliation are:");
print(sortedArrClub, true);

console.log("******************************************************************************");



  /* Your program should output the following to the console.log, including each of the opening and closing 
  5 stars. All values in parenthesis should be replaced with appropriate values. To accomplish this, you will 
  have to sort the array of students using each comparator and then loop through the array and and call logMe
  on each student of the now-sorted array. If the argument is 'true' then it prints the student's name, major, 
  year in school, and club affiliation. If the argument is 'false' then the club affiliation is ommited and 
  just the student's name, major and year in school is logged. Please carefully note which sorted results require
  the club to be displayed and which do not.
  
  **********
  The students sorted by year in school are:
  (Name - Major - Year) // of the "greatest" student
  ...
  (Name - Major - Year) // of the "least" student
  
  **********
  The students sorted by major are:
  (Name - Major - Year) // of the "greatest" student
  ...
  (Name - Major - Year) // of the "least" student
  
  **********
  The students sorted by club affiliation are:
  (Name - Major - Year - Club) // of the "greatest" student
  ...
  (Name - Major - Year - Club) // of the "least" student
  
  **********
  
  As an example of what is expected to be printed to the console with logMe being sent True for a single student:
  Jim - Sports Science - 2 - Guitar
  
  */

