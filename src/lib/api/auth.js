// Login requests. For now it fakes the backend.
// When the real API is ready, the real request goes here (TODO 11 from the legacy version).
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

