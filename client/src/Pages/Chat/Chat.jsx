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

const formatListTime = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const now = new Date();
  const sameDay =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();
  if (sameDay) return formatTime(d);
  return d.toLocaleDateString([], { day: "numeric", month: "short" });
};

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("") || "?";

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
  const inputRef = useRef(null);

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

  const loadMessages = useCallback(async (id, { silent = false } = {}) => {
    if (!id) return;
    try {
      if (!silent) setMessagesLoading(true);
      setError("");
      const { data } = await getMessages(id);
      setMessages(data.messages || []);
    } catch (err) {
      if (!silent) {
        setError(err.response?.data?.message || "Failed to load messages.");
      }
    } finally {
      if (!silent) setMessagesLoading(false);
    }
  }, []);

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
      inputRef.current?.focus();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  const getCounterparty = (swap) =>
    swap.requester?._id === user?._id ? swap.owner : swap.requester;

  const showChatPane = Boolean(swapId);
  const counterparty = activeConversation
    ? getCounterparty(activeConversation.swap)
    : null;

  return (
    <MainLayout hideFooter>
      <section className="px-0 sm:px-4 sm:pt-3 lg:px-6">
        <div className="chat-shell">
          {/* Conversation list — phone: alone; tablet+/laptop: side panel */}
          <aside
            className={`flex w-full flex-col border-r border-black/5 bg-[#f0f2f5] lg:w-[36%] lg:max-w-md ${
              showChatPane ? "hidden lg:flex" : "flex"
            }`}
          >
            <div className="flex items-center justify-between bg-moss-800 px-4 py-3.5 text-white">
              <div className="min-w-0 pr-3">
                <h1 className="font-display text-lg font-bold tracking-tight">
                  Chats
                </h1>
                <p className="truncate text-xs text-white/65">
                  Swap conversations
                </p>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-bold">
                {initials(user?.fullName)}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversationsLoading ? (
                <div className="py-16">
                  <Loader />
                </div>
              ) : conversations.length === 0 ? (
                <div className="px-6 py-16 text-center text-sm text-ink/50">
                  No conversations yet.
                  <br />
                  <Link
                    to="/swaps"
                    className="mt-3 inline-block font-semibold text-moss-800 hover:underline"
                  >
                    Check your swaps
                  </Link>
                </div>
              ) : (
                conversations.map(({ swap, lastMessage, unreadCount }) => {
                  const person = getCounterparty(swap);
                  const isActive = swap._id === swapId;

                  return (
                    <button
                      key={swap._id}
                      type="button"
                      onClick={() => navigate(`/chat/${swap._id}`)}
                      className={`flex w-full items-center gap-3 border-b border-black/5 px-4 py-3.5 text-left transition ${
                        isActive ? "bg-[#e7e9eb]" : "hover:bg-[#e9edef]"
                      }`}
                    >
                      <img
                        src={getImageUrl(swap.requestedItem?.images?.[0])}
                        alt=""
                        className="h-12 w-12 shrink-0 rounded-full object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <p className="truncate font-semibold text-ink">
                            {person?.fullName || "Unknown"}
                          </p>
                          <span className="shrink-0 text-[11px] text-ink/45">
                            {formatListTime(
                              lastMessage?.createdAt || swap.updatedAt
                            )}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center justify-between gap-2">
                          <p className="truncate text-sm text-ink/55">
                            {lastMessage?.content || "No messages yet"}
                          </p>
                          {unreadCount > 0 ? (
                            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-moss-700 px-1.5 text-[11px] font-bold text-white">
                              {unreadCount}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 truncate text-[11px] text-ink/40">
                          {swap.requestedItem?.title}
                        </p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </aside>

          {/* Message thread */}
          <div
            className={`relative flex min-w-0 flex-1 flex-col ${
              showChatPane ? "flex" : "hidden lg:flex"
            }`}
          >
            {!swapId ? (
              <div className="flex flex-1 flex-col items-center justify-center bg-[#f0f2f5] px-6 text-center">
                <div className="clay-sm max-w-sm p-8">
                  <p className="font-display text-xl font-bold text-ink">
                    Fashion Swap Chat
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/55">
                    Select a conversation from the left to message about a swap.
                  </p>
                </div>
              </div>
            ) : messagesLoading ? (
              <div className="flex flex-1 items-center justify-center bg-[#efeae2]">
                <Loader />
              </div>
            ) : error ? (
              <div className="flex flex-1 items-center justify-center bg-[#efeae2] px-6 text-center text-red-600">
                {error}
              </div>
            ) : (
              <>
                <header className="flex items-center gap-2 bg-moss-800 px-2 py-2.5 text-white sm:gap-3 sm:px-4">
                  <button
                    type="button"
                    onClick={() => navigate("/chat")}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl hover:bg-white/10 lg:hidden"
                    aria-label="Back to chats"
                  >
                    <HiArrowLeft />
                  </button>

                  <img
                    src={getImageUrl(
                      activeConversation?.swap?.requestedItem?.images?.[0]
                    )}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                  />

                  <div className="min-w-0 flex-1 pr-2">
                    <p className="truncate font-semibold leading-tight">
                      {counterparty?.fullName || "Conversation"}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-white/65">
                      Re:{" "}
                      {activeConversation?.swap?.requestedItem?.title || "Swap"}
                    </p>
                  </div>

                  <Link
                    to="/swaps"
                    className="shrink-0 rounded-full px-3 py-2 text-xs font-semibold text-white/90 hover:bg-white/10"
                  >
                    View swap
                  </Link>
                </header>

                <div className="chat-messages">
                  {messages.length === 0 ? (
                    <div className="mx-auto mt-8 max-w-xs rounded-lg bg-[#ffeec2]/95 px-4 py-3 text-center text-xs leading-relaxed text-ink/70 shadow-sm">
                      No messages yet. Say hello and start discussing your swap.
                    </div>
                  ) : (
                    <div className="mx-auto w-full max-w-3xl">
                      {messages.map((msg) => {
                        const isMine = msg.sender?._id === user?._id;
                        return (
                          <div
                            key={msg._id}
                            className={`chat-row ${isMine ? "mine" : "theirs"}`}
                          >
                            <div
                              className={`chat-bubble ${isMine ? "mine" : "theirs"}`}
                            >
                              {!isMine && (
                                <p className="chat-bubble-sender">
                                  {msg.sender?.fullName}
                                </p>
                              )}
                              <p className="chat-bubble-text">{msg.content}</p>
                              <p className="chat-bubble-time">
                                {formatTime(msg.createdAt)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>

                <form onSubmit={handleSend} className="chat-composer">
                  <input
                    ref={inputRef}
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a message"
                    aria-label="Message"
                  />
                  <button
                    type="submit"
                    disabled={sending || !text.trim()}
                    aria-label="Send message"
                  >
                    <HiPaperAirplane className="rotate-90 text-lg" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Chat;
