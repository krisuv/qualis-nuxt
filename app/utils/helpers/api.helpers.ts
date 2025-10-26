export async function wait(miliseconds: number): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(resolve, miliseconds);
  })
}