// PPL 2023 HW4 Part2

// Q 2.1 

// Specify the return type.
export const delayedSum = (a: number, b: number, delay: number) : Promise<number> => 
    new Promise<number>((resolve, reject) => delay < 0 ?
        reject("negative delay") :
        setTimeout(()=>{resolve(a+b)},delay))  
    
export const testDelayedSum = () => {
    const time: number = Date.now()

    delayedSum(2,4,1000).then((result : number) => {
        if(Date.now() - time >= 1000) console.log("1000 ms passed")
        else  console.log("1000 ms didn't pass !!!!!")

        if(result != 6) console.log("2 + 4 != 6 apparantly")
        else console.log("2 + 4 == 6 goodie")
    })  
 }
 

// Q 2.2

// Values returned by API calls.
export type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
}

// When invoking fetchData(postsUrl) you obtain an Array Post[]
// To obtain an array of posts
export const postsUrl = 'https://jsonplaceholder.typicode.com/posts'; 

// Append the desired post id.
export const postUrl = 'https://jsonplaceholder.typicode.com/posts/'; 

// When invoking fetchData(invalidUrl) you obtain an error
export const invalidUrl = 'https://jsonplaceholder.typicode.com/invalid';

// Depending on the url - fetchData can return either an array of Post[] or a single Post.
// Specify the return type without using any.
export const fetchData = async (url: String) => 
    "TODO";

export const testFetchData = () => {
    console.log("TODO testFetchData");
}

// Q 2.3

// Specify the return type.
export const fetchMultipleUrls = async (urls: string[]) => 
    "TODO";

export const testFetchMultipleUrls = () => {
    console.log("TODO testFetchData");
}
