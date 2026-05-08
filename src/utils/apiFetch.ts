export async function apiFetch(url: string, options: RequestInit) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const text = await response.json();
      throw new Error(`${text.messageError}`);
    }
    return response;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error('Ocorreu um erro inesperado no servidor.');
    }
    throw error;
  }
}
