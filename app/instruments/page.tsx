import { createClient } from "@/utils/supabase/server";

export default async function Instruments() {
  const supabase = await createClient();
  const { data: instruments, error } = await supabase
    .from("instruments")
    .select();

  if (error) {
    return <p>Chyba při načítání dat: {error.message}</p>;
  }

  if (!instruments || instruments.length === 0) {
    return <p>Žádné nástroje nebyly nalezeny.</p>;
  }

  return (
    <div>
      <h1>Hudební nástroje</h1>
      <ul>
        {instruments.map((instrument) => (
          <li key={instrument.id}>{instrument.name}</li>
        ))}
      </ul>
    </div>
  );
}
