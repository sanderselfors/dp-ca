import { createClient } from "@utils/supabase/server";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { data, error } = await createClient.from("cars").select("*");
      if (error) throw error;
      return res.status(200).json(data);
    } else if (req.method === "POST") {
      const { make, model, year } = req.body;
      const { data, error } = await createClient
        .from("cars")
        .insert([{ make, model, year }]);
      if (error) throw error;
      return res.status(201).json(data);
    } else if (req.method === "DELETE") {
      const { id } = req.body;
      const { error } = await createClient.from("cars").delete().match({ id });
      if (error) throw error;
      return res.status(200).json({ message: "Car deleted successfully" });
    } else {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
}
