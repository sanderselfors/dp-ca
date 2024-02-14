import { createClient } from "@/utils/supabase/server";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { data, error } = await createClient.from("phones").select("*");
      if (error) throw error;
      return res.status(200).json(data);
    } else if (req.method === "POST") {
      const { brand, model, year } = req.body;
      const { data, error } = await createClient
        .from("phones")
        .insert([{ brand, model, year }]);
      if (error) throw error;
      return res.status(201).json(data);
    } else if (req.method === "DELETE") {
      const { id } = req.body;
      const { error } = await createClient
        .from("phones")
        .delete()
        .match({ id });
      if (error) throw error;
      return res.status(200).json({ message: "Phone deleted successfully" });
    } else {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
}
