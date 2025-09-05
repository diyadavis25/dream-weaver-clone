import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">St. Mary's Church Karuvannur</h1>
        <p className="text-xl text-muted-foreground mb-8">Welcome to our Onam Treasure Hunt!</p>
        <Button 
          onClick={() => navigate('/treasure-hunt')}
          className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-semibold px-8 py-3"
        >
          Start Treasure Hunt 🌺
        </Button>
      </div>
    </div>
  );
};

export default Index;
