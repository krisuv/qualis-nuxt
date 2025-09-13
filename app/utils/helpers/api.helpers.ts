export async function wait(miliseconds: number): Promise<void> {
  await new Promise((resolve) => {
    const timeout = setTimeout(resolve, miliseconds);

    clearTimeout(timeout);
  })
}