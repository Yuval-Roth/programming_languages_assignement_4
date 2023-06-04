// PPL 2023 HW4 Part2

// Q 2.1 

// Specify the return type.
export const delayedSum = (a: number, b: number, delay: number) : Promise<number> => 
    new Promise<number>((resolve, reject) => delay < 0 ?
        reject("received negative delay in argument. we do not support traveling back in time yet") :
        setTimeout(()=>{resolve(a+b)},delay))  
    
export const testDelayedSum = () => {
    const time: number = Date.now()

    delayedSum(2,4,-10).then((result : number) => {
        if(Date.now() - time >= 1000)
            console.log("1000 ms failed to fail successfully") // this is good
        else
            console.log("1000 ms failed !!!!! *surprised_pikachu_face.png*") // this is not so good (but we do not discriminate)

        if(result != 6)
            console.log("person 1: '2 plus 4 is not 6', person 2(slightly fat): 'OH NO! anyway....'") // this is as mild inconvenience 
        else
            console.log("2 + 4 == 6 es verdad! tan maravilioso, tan bonito!!!!!") // MUM CAN I HAZ DIS? 
    }).catch((error : string) => console.log("error: "+ error))
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
