export default defineEventHandler((event) => {
    setResponseStatus(event, 405);

    return {
      hello: 'Illegal method'
    }
  })