
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Account = () => {
  const { user, signOut, isAdmin, isEditor } = useAuth();
  const { toast } = useToast();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Logout effettuato",
        description: "Sei stato disconnesso con successo",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Errore",
        description: "Impossibile effettuare il logout",
        variant: "destructive",
      });
    }
  };
  
  if (!user) {
    return (
      <div className="mt-4">
        <Link to="/login">
          <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-700">
            <LogIn className="mr-2 h-4 w-4" />
            Accedi
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-lg">
      <div className="flex items-center mb-4">
        <div className="bg-gray-700 rounded-full p-2 mr-3">
          <User className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="text-sm font-medium text-white">{user.email}</div>
          {(isAdmin || isEditor) && (
            <div className="text-xs text-wurth-red">
              {isAdmin ? 'Amministratore' : 'Editor'}
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        {(isAdmin || isEditor) && (
          <Link to="/admin">
            <Button variant="outline" size="sm" className="w-full border-gray-700 text-gray-300 hover:bg-gray-700">
              Pannello Admin
            </Button>
          </Link>
        )}
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full border-gray-700 text-gray-300 hover:bg-gray-700"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-3 w-3" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Account;
