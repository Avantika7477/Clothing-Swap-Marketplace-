import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { HiArrowLeft, HiPaperAirplane } from "react-icons/hi";
import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import { useAuth } from "../../context/AuthContext";
import { getImageUrl } from "../../services/api";
import { getConversations, getMessages, sendMessage } from "../../services/clothingApi";

const POLL_INTERVAL = 5000;

const formatTime = (date) =>
  new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const Chat = () => {
  const { swapId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [conversations, setConversations] = useState([]);
  const [conversationsLoading, setConversationsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [error, setError] = useState("");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  const loadConversations = useCallback(async () => {
    try {
      const { data } = await getConversations();
      setConversations(data.conversations || []);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to load conversations."
      );
    } finally {
      setConversationsLoading(false);
    }
  }, []);

  const loadMessages = useCallback(
    async (id, { silent = false } = {}) => {
      if (!id) return;
      try {
        if (!silent) setMessagesLoading(true);
        setError("");
        const { data } = await getMessages(id);
        setMessages(data.messages || []);
      } catch (err) {
        if (!silent) {
          setError(
            err.response?.data?.message || "Failed to load messages."
          );
        }
      } finally {
        if (!silent) setMessagesLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  useEffect(() => {
    if (!swapId) {
      setMessages([]);
      return;
    }
    loadMessages(swapId);

    const interval = setInterval(() => {
      loadMessages(swapId, { silent: true });
    }, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [swapId, loadMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const activeConversation = conversations.find((c) => c.swap._id === swapId);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() || !swapId) return;

    try {
      setSending(true);
      await sendMessage(swapId, text.trim());
      setText("");
      await loadMessages(swapId, { silent: true });
      loadConversations();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  const getCounterparty = (swap) =>
    swap.requester?._id === user?._id ? swap.owner : swap.requester;

  return (
    <MainLayout>
      <section className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Messages</h1>

          <div className="grid md:grid-cols-3 gap-6 bg-white rounded-2xl shadow-md overflow-hidden min-h-[70vh]">
            {/* Conversation list */}
            <div className="border-r border-gray-100 md:col-span-1 max-h-[75vh] overflow-y-auto">
              {conversationsLoading ? (
                <Loader />
              ) : conversations.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No conversations yet.
                </div>
              ) : (
                conversations.map(({ swap, lastMessage, unreadCount }) => {
                  const counterparty = getCounterparty(swap);
                  const isActive = swap._id === swapId;

                  return (
                    <button
                      key={swap._id}
                      onClick={() => navigate(`/chat/${swap._id}`)}
                      className={`w-full text-left flex items-center gap-3 px-5 py-4 border-b border-gray-50 transition ${
                        isActive ? "bg-moss-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <img
                        src={getImageUrl(swap.requestedItem?.images?.[0])}
                        alt={swap.requestedItem?.title}
                        className="w-12 h-12 rounded-full object-cover border"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold text-gray-900 truncate">
                            {counterparty?.fullName || "Unknown"}
                          </p>
                          {unreadCount > 0 && (
                            <span className="bg-moss-800 text-white text-xs rounded-full px-2 py-0.5">
                              {unreadCount}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {lastMessage?.content || "No messages yet"}
                        </p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Message thread */}
            <div className="md:col-span-2 flex flex-col max-h-[75vh]">
              {!swapId ? (
                <div className="flex-1 flex items-center justify-center text-gray-400">
                  Select a conversation to start chatting.
                </div>
              ) : messagesLoading ? (
                <Loader />
              ) : error ? (
                <div className="p-6 text-red-600">{error}</div>
              ) : (
                <>
                  <div className="flex items-center justify-between px-6 py-4 border-b">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => navigate("/chat")}
                        className="md:hidden text-gray-500"
                      >
                        <HiArrowLeft />
                      </button>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {activeConversation
                            ? getCounterparty(activeConversation.swap)?.fullName
                            : "Conversation"}
                        </p>
                        <p className="text-xs text-gray-400">
                          Re: {activeConversation?.swap?.requestedItem?.title}
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/swaps"
                      className="text-sm text-moss-800 hover:underline"
                    >
                      View Swap
                    </Link>
                  </div>

                  <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                    {messages.length === 0 ? (
                      <p className="text-center text-gray-400 mt-10">
                        No messages yet. Say hello!
                      </p>
                    ) : (
                      messages.map((msg) => {
                        const isMine = msg.sender?._id === user?._id;
                        return (
                          <div
                            key={msg._id}
                            className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                                isMine
                                  ? "bg-moss-800 text-white"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {!isMine && (
                                <p className="text-xs font-semibold mb-1 opacity-80">
                                  {msg.sender?.fullName}
                                </p>
                              )}
                              <p className="whitespace-pre-wrap break-words">
                                {msg.content}
                              </p>
                              <p
                                className={`text-[10px] mt-1 text-right ${
                                  isMine ? "text-green-100" : "text-gray-400"
                                }`}
                              >
                                {formatTime(msg.createdAt)}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <form
                    onSubmit={handleSend}
                    className="flex items-center gap-3 px-6 py-4 border-t"
                  >
                    <input
                      type="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 border rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-moss-700"
                    />
                    <button
                      type="submit"
                      disabled={sending || !text.trim()}
                      className="bg-moss-800 hover:bg-moss-700 disabled:opacity-50 text-white p-3 rounded-full transition"
                    >
                      <HiPaperAirplane className="rotate-90" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Chat;
