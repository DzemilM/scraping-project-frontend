// TODO 1 — fakeLogin and the test account go here.
// Later (when the backend is ready) this file will hold the real login request.
const testEmail = "test@example.com";
const testPassword = "password123";

export function fakeLogin(email, password){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(email === testEmail && password === testPassword){
                resolve({ token: "abc123" });
            } else {
                reject(new Error("Invalid email or password"));
            }
        }, 1000);
    });
};

