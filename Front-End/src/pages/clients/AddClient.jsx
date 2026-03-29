// src/pages/clients/AddClient.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ClientForm from "../../components/clients/ClientForm";
import clientService from "../../services/ClientService";

function AddClient() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await clientService.creerClient(data);
      toast.success("Client créé avec succès !");
      navigate("/clients");
    } catch (error) {
      // Erreur validation Laravel → 422
      if (error.response?.status === 422) {
        const erreurs = error.response.data.errors;
        Object.values(erreurs).forEach((messages) => {
          toast.error(messages[0]);
        });

        // Token expiré → 401
      } else if (error.response?.status === 401) {
        toast.error("Session expirée. Reconnectez-vous.");
        navigate("/login");

        // Erreur serveur → 500
      } else {
        toast.error("Une erreur est survenue. Réessayez.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ClientForm onSubmit={onSubmit} loading={loading} />
    </div>
  );
}

export default AddClient;
