import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Trash2, Mail } from "lucide-react";

export default function AdminMessages() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  // Redirect if not admin
  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      setLocation("/");
    }
  }, [user, loading, setLocation]);

  const { data, isLoading, refetch } = trpc.messages.list.useQuery({
    limit: pageSize,
    offset: currentPage * pageSize,
  });

  const markAsReadMutation = trpc.messages.markAsRead.useMutation({
    onSuccess: () => {
      toast.success("Message marked as read");
      refetch();
    },
    onError: () => {
      toast.error("Failed to mark message as read");
    },
  });

  const deleteMutation = trpc.messages.delete.useMutation({
    onSuccess: () => {
      toast.success("Message deleted");
      refetch();
    },
    onError: () => {
      toast.error("Failed to delete message");
    },
  });

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  const messages = data?.messages || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Contact Messages</h1>
          <div className="text-sm text-slate-600">
            Total: {total} messages
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin">Loading messages...</div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-lg">
            <Mail className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">No messages yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-4 border rounded-lg ${
                  msg.read ? "bg-white border-slate-200" : "bg-blue-50 border-blue-200"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">{msg.name}</h3>
                      {!msg.read && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                          Unread
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{msg.email}</p>
                    <p className="text-slate-700 mb-2">{msg.message}</p>
                    <p className="text-xs text-slate-500">
                      {new Date(msg.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {!msg.read && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markAsReadMutation.mutate({ id: msg.id })}
                        disabled={markAsReadMutation.isPending}
                      >
                        Mark as Read
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteMutation.mutate({ id: msg.id })}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
            >
              Previous
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i ? "default" : "outline"}
                  onClick={() => setCurrentPage(i)}
                  size="sm"
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
