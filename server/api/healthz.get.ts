export default defineEventHandler(async (event) => {
    setHeader(event, 'cache-control', 'no-store');
    setResponseStatus(event, 204);
    
    return null; 
})