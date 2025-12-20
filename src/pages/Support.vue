<script setup lang="ts">
import { ref, computed } from 'vue'

interface Message {
  id: string
  sender: 'user' | 'support'
  content: string
  timestamp: string
}

interface Ticket {
  id: string
  ticketNumber: string
  title: string
  status: 'open' | 'closed' | 'in-progress'
  priority: 'low' | 'medium' | 'high'
  messageCount: number
  updatedAt: string
  messages: Message[]
}

const tickets = ref<Ticket[]>([
  {
    id: '1',
    ticketNumber: '#2456',
    title: 'API rate limit question',
    status: 'open',
    priority: 'medium',
    messageCount: 3,
    updatedAt: '2 hours ago',
    messages: [
      {
        id: '1',
        sender: 'user',
        content:
          "Hi, I'm experiencing rate limiting even though I'm within my quota. Can you help?",
        timestamp: '2 hours ago',
      },
      {
        id: '2',
        sender: 'support',
        content:
          "Hello! I'd be happy to help you with this issue. Can you provide your API key (first 8 characters only) and the approximate time when you encountered the rate limiting?",
        timestamp: '1 hour ago',
      },
      {
        id: '3',
        sender: 'user',
        content:
          'Sure! The API key is sk_live_a1b2c3d4 and I encountered this around 09:30 AM today.',
        timestamp: '45 minutes ago',
      },
    ],
  },
  {
    id: '2',
    ticketNumber: '#2455',
    title: 'Billing inquiry',
    status: 'closed',
    priority: 'low',
    messageCount: 5,
    updatedAt: '1 day ago',
    messages: [
      {
        id: '1',
        sender: 'user',
        content: 'I have a question about my last invoice.',
        timestamp: '1 day ago',
      },
      {
        id: '2',
        sender: 'support',
        content:
          'Sure, I can help with billing questions. What would you like to know?',
        timestamp: '1 day ago',
      },
    ],
  },
  {
    id: '3',
    ticketNumber: '#2454',
    title: 'Authentication error',
    status: 'in-progress',
    priority: 'high',
    messageCount: 8,
    updatedAt: '3 hours ago',
    messages: [
      {
        id: '1',
        sender: 'user',
        content: 'Getting 401 errors on all my API calls suddenly.',
        timestamp: '3 hours ago',
      },
      {
        id: '2',
        sender: 'support',
        content:
          'We are investigating this issue. It appears there might be a service disruption.',
        timestamp: '2 hours ago',
      },
    ],
  },
  {
    id: '4',
    ticketNumber: '#2453',
    title: 'Feature request: webhooks',
    status: 'open',
    priority: 'low',
    messageCount: 2,
    updatedAt: '2 days ago',
    messages: [
      {
        id: '1',
        sender: 'user',
        content:
          'Would love to see webhook support for real-time notifications.',
        timestamp: '2 days ago',
      },
      {
        id: '2',
        sender: 'support',
        content:
          'Thank you for the suggestion! I have forwarded this to our product team.',
        timestamp: '2 days ago',
      },
    ],
  },
  {
    id: '5',
    ticketNumber: '#2452',
    title: 'Connection timeout issues',
    status: 'closed',
    priority: 'high',
    messageCount: 12,
    updatedAt: '3 days ago',
    messages: [
      {
        id: '1',
        sender: 'user',
        content: 'Experiencing frequent connection timeouts.',
        timestamp: '3 days ago',
      },
      {
        id: '2',
        sender: 'support',
        content:
          'This issue has been resolved. The timeout was due to a network configuration issue on our end.',
        timestamp: '3 days ago',
      },
    ],
  },
])

const selectedTicketId = ref<string>('1')
const newMessage = ref('')
const isNewTicketModalOpen = ref(false)
const newTicketTitle = ref('')
const newTicketMessage = ref('')
const newTicketPriority = ref<'low' | 'medium' | 'high'>('medium')

const selectedTicket = computed(() => {
  return tickets.value.find((t) => t.id === selectedTicketId.value) || null
})

const selectTicket = (ticketId: string) => {
  selectedTicketId.value = ticketId
}

const sendMessage = () => {
  if (!newMessage.value.trim() || !selectedTicket.value) return

  const message: Message = {
    id: Date.now().toString(),
    sender: 'user',
    content: newMessage.value.trim(),
    timestamp: 'Just now',
  }

  selectedTicket.value.messages.push(message)
  selectedTicket.value.messageCount++
  selectedTicket.value.updatedAt = 'Just now'
  newMessage.value = ''
}

const openNewTicketModal = () => {
  isNewTicketModalOpen.value = true
}

const closeNewTicketModal = () => {
  isNewTicketModalOpen.value = false
  newTicketTitle.value = ''
  newTicketMessage.value = ''
  newTicketPriority.value = 'medium'
}

const createTicket = () => {
  if (!newTicketTitle.value.trim() || !newTicketMessage.value.trim()) return

  const ticketNumber = `#${2456 + tickets.value.length}`
  const newTicket: Ticket = {
    id: Date.now().toString(),
    ticketNumber,
    title: newTicketTitle.value.trim(),
    status: 'open',
    priority: newTicketPriority.value,
    messageCount: 1,
    updatedAt: 'Just now',
    messages: [
      {
        id: '1',
        sender: 'user',
        content: newTicketMessage.value.trim(),
        timestamp: 'Just now',
      },
    ],
  }

  tickets.value.unshift(newTicket)
  selectedTicketId.value = newTicket.id
  closeNewTicketModal()
}

const getStatusClass = (status: string) => {
  return status.toLowerCase().replace('-', '')
}

const getPriorityClass = (priority: string) => {
  return priority.toLowerCase()
}
</script>

<template>
  <div id="support">
    <div class="top">
      <div class="left">
        <h2>Support</h2>
        <p>Get help from our support team</p>
      </div>
      <button class="new-ticket-btn" @click="openNewTicketModal">
        <span>+</span> New Ticket
      </button>
    </div>

    <div class="support-content">
      <!-- Ticket List -->
      <div class="tickets-panel">
        <h3 class="panel-title">Your Tickets</h3>
        <div class="tickets-list">
          <div
            v-for="ticket in tickets"
            :key="ticket.id"
            class="ticket-item"
            :class="{ selected: selectedTicketId === ticket.id }"
            @click="selectTicket(ticket.id)"
          >
            <div class="ticket-header">
              <span class="ticket-title">{{ ticket.title }}</span>
              <span class="status-badge" :class="getStatusClass(ticket.status)">
                {{ ticket.status }}
              </span>
            </div>
            <div class="ticket-meta">
              <span class="ticket-number">{{ ticket.ticketNumber }}</span>
              <span
                class="priority-badge"
                :class="getPriorityClass(ticket.priority)"
              >
                {{ ticket.priority }}
              </span>
              <span class="message-count">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                  ></path>
                </svg>
                {{ ticket.messageCount }}
              </span>
            </div>
            <span class="ticket-time">{{ ticket.updatedAt }}</span>
          </div>
        </div>
      </div>

      <!-- Ticket Detail -->
      <div class="detail-panel" v-if="selectedTicket">
        <div class="detail-header">
          <div class="detail-title-row">
            <h3 class="detail-title">{{ selectedTicket.title }}</h3>
            <div class="detail-badges">
              <span
                class="status-badge"
                :class="getStatusClass(selectedTicket.status)"
              >
                {{ selectedTicket.status }}
              </span>
              <span
                class="priority-badge outline"
                :class="getPriorityClass(selectedTicket.priority)"
              >
                {{ selectedTicket.priority }}
              </span>
            </div>
          </div>
          <p class="detail-meta">
            Ticket {{ selectedTicket.ticketNumber }} • Updated
            {{ selectedTicket.updatedAt }}
          </p>
        </div>

        <div class="messages-container">
          <div
            v-for="message in selectedTicket.messages"
            :key="message.id"
            class="message"
            :class="message.sender"
          >
            <div class="message-header">
              <span class="message-sender-avatar" :class="message.sender">
                {{ message.sender === 'user' ? 'Y' : 'S' }}
              </span>
              <div class="message-info">
                <span class="message-sender">{{
                  message.sender === 'user' ? 'You' : 'Support Team'
                }}</span>
                <span class="message-time">{{ message.timestamp }}</span>
              </div>
            </div>
            <div class="message-content">
              <p>{{ message.content }}</p>
            </div>
          </div>
        </div>

        <div class="message-input-container">
          <input
            v-model="newMessage"
            type="text"
            placeholder="Type your message..."
            class="message-input"
            @keyup.enter="sendMessage"
          />
          <button class="attach-btn" title="Attach file">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
              ></path>
            </svg>
          </button>
          <button
            class="send-btn"
            @click="sendMessage"
            :disabled="!newMessage.trim()"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- New Ticket Modal -->
    <Transition name="modal">
      <div
        v-if="isNewTicketModalOpen"
        class="modal-overlay"
        @click.self="closeNewTicketModal"
      >
        <div class="modal-container">
          <div class="modal-header">
            <div>
              <h3 class="modal-title">Create New Ticket</h3>
              <p class="modal-subtitle">
                Describe your issue and we'll get back to you soon
              </p>
            </div>
            <button class="close-btn" @click="closeNewTicketModal">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="ticket-title">Subject</label>
              <input
                id="ticket-title"
                v-model="newTicketTitle"
                type="text"
                placeholder="Brief description of your issue"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label for="ticket-priority">Priority</label>
              <select
                id="ticket-priority"
                v-model="newTicketPriority"
                class="form-input"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div class="form-group">
              <label for="ticket-message">Message</label>
              <textarea
                id="ticket-message"
                v-model="newTicketMessage"
                placeholder="Describe your issue in detail..."
                class="form-input textarea"
                rows="5"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button class="cancel-btn" @click="closeNewTicketModal">
              Cancel
            </button>
            <button
              class="submit-btn"
              @click="createTicket"
              :disabled="!newTicketTitle.trim() || !newTicketMessage.trim()"
            >
              Create Ticket
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
#support {
  padding: 24px 0;

  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;

    .left {
      h2 {
        font-size: 24px;
        line-height: 32px;
        font-weight: 500;
        margin-bottom: 4px;
      }

      p {
        font-size: 14px;
        line-height: 20px;
        color: var(--text-secondary);
      }
    }

    .new-ticket-btn {
      background-color: var(--primary-color);
      color: #fff;
      border: none;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 14px;
      line-height: 20px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 16px;
      transition: all 0.2s ease-in-out;

      &:hover {
        box-shadow: var(--shadow-md);
      }

      span {
        font-size: 20px;
        line-height: 0;
      }
    }
  }

  .support-content {
    display: flex;
    gap: 24px;
    min-height: 600px;
  }

  .tickets-panel {
    width: 380px;
    flex-shrink: 0;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 14px;
    padding: 24px 0;
    display: flex;
    flex-direction: column;

    .panel-title {
      font-size: 16px;
      margin: 0 24px;
      font-weight: 500;
      color: var(--text-primary);
      margin-bottom: 20px;
    }

    .tickets-list {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      flex: 1;
    }

    .ticket-item {
      padding: 16px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      border: 1px solid transparent;

      &:hover {
        background: var(--bg-tertiary);
      }

      &.selected {
        background: var(--bg-secondary);
        border-color: var(--border-color);
      }

      .ticket-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 12px;
        margin-bottom: 8px;
      }

      .ticket-title {
        font-size: 14px;
        font-weight: 500;
        color: var(--text-primary);
        flex: 1;
      }

      .ticket-meta {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 4px;
      }

      .ticket-number {
        font-size: 13px;
        color: var(--text-secondary);
      }

      .message-count {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 13px;
        color: var(--text-secondary);

        svg {
          opacity: 0.7;
        }
      }

      .ticket-time {
        font-size: 12px;
        color: var(--text-tertiary);
      }
    }
  }

  .status-badge {
    padding: 2px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;

    &.open {
      background-color: #2b7fff;
      color: #fff;
    }

    &.closed {
      background-color: var(--text-secondary);
      color: #fff;
    }

    &.inprogress {
      background-color: var(--primary-color);
      color: #fff;
    }
  }

  .priority-badge {
    font-size: 12px;
    font-weight: 500;
    text-transform: lowercase;

    &.low {
      color: var(--success-color);
    }

    &.medium {
      color: var(--primary-color);
    }

    &.high {
      color: var(--error-color);
    }

    &.outline {
      padding: 2px 8px;
      border-radius: 8px;
      background: transparent;
      border: 1px solid currentColor;
    }
  }

  .detail-panel {
    flex: 1;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .detail-header {
      padding: 24px;
      border-bottom: 1px solid var(--border-color);

      .detail-title-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }

      .detail-title {
        font-size: 18px;
        font-weight: 500;
        color: var(--text-primary);
      }

      .detail-badges {
        display: flex;
        gap: 8px;
      }

      .detail-meta {
        font-size: 14px;
        color: var(--text-secondary);
      }
    }

    .messages-container {
      flex: 1;
      padding: 24px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .message {
      display: flex;
      flex-direction: column;

      .message-header {
        display: flex;
        gap: 12px;
      }

      .message-sender-avatar {
        width: 32px !important;
        height: 32px !important ;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 500;

        &.user {
          background-color: var(--primary-color);
          color: #fff;
        }

        &.support {
          background-color: var(--text-secondary);
          color: #fff;
        }
      }

      .message-info {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 8px;
      }

      .message-sender {
        font-size: 14px;
        font-weight: 500;
        color: var(--text-primary);
      }

      .message-time {
        font-size: 12px;
        color: var(--text-tertiary);
      }

      .message-content {
        padding: 12px 16px;
        border-radius: 12px;

        p {
          font-size: 14px;
          line-height: 1.5;
        }
      }

      &.user .message-content {
        margin-left: 44px;
        background-color: color-mix(
          in srgb,
          var(--text-secondary) 10%,
          transparent
        );
        color: var(--text-primary);
      }

      &.support .message-header {
        flex-direction: row-reverse;
        justify-content: space-between;
      }

      &.support .message-content {
        margin-right: 44px;
        background-color: color-mix(
          in srgb,
          var(--primary-color) 10%,
          transparent
        );
        color: var(--text-primary);
      }
    }

    .message-input-container {
      padding: 16px 24px 24px;
      display: flex;
      gap: 12px;
      align-items: center;
      border-top: 1px solid var(--border-color);

      .message-input {
        flex: 1;
        padding: 12px 16px;
        font-size: 14px;
        color: var(--text-primary);
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 24px;
        outline: none;
        transition: all 0.2s ease;
        font-family: inherit;

        &::placeholder {
          color: var(--text-tertiary);
        }

        &:focus {
          border-color: var(--primary-color);
          background: var(--bg-primary);
        }
      }

      .attach-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: transparent;
        border: 1px solid var(--border-color);
        color: var(--text-secondary);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease-in-out;

        &:hover {
          background: var(--bg-secondary);
          color: var(--text-primary);
        }
      }

      .send-btn {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: var(--primary-color);
        border: none;
        color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease-in-out;

        &:hover:not(:disabled) {
          box-shadow: var(--shadow-md);
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }
  }

  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-container {
    background: var(--bg-primary);
    border-radius: 16px;
    max-width: 520px;
    width: 100%;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
  }

  .modal-header {
    padding: 24px 24px 20px 24px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .modal-title {
      font-size: 18px;
      font-weight: 500;
      color: var(--text-primary);
      margin-bottom: 4px;
    }

    .modal-subtitle {
      font-size: 14px;
      color: var(--text-secondary);
    }

    .close-btn {
      background: none;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s ease-in-out;

      &:hover {
        color: var(--text-primary);
      }
    }
  }

  .modal-body {
    padding: 24px;

    .form-group {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }

      label {
        display: block;
        font-size: 14px;
        font-weight: 500;
        color: var(--text-primary);
        margin-bottom: 8px;
      }

      .form-input {
        width: 100%;
        padding: 10px 12px;
        font-size: 14px;
        color: var(--text-primary);
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        outline: none;
        transition: all 0.2s ease;
        font-family: inherit;

        &::placeholder {
          color: var(--text-tertiary);
        }

        &:focus {
          border-color: var(--primary-color);
          background: var(--bg-primary);
        }

        &.textarea {
          resize: vertical;
          min-height: 100px;
        }
      }

      select.form-input {
        cursor: pointer;
      }
    }
  }

  .modal-footer {
    padding: 16px 24px;
    border-top: 1px solid var(--border-color);
    display: flex;
    justify-content: flex-end;
    gap: 12px;

    .cancel-btn {
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      padding: 10px 20px;
      font-weight: 500;
      font-size: 14px;
      color: var(--text-primary);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        background: var(--bg-secondary);
      }
    }

    .submit-btn {
      background-color: var(--primary-color);
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover:not(:disabled) {
        box-shadow: var(--shadow-md);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }

  /* Modal Transitions */
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.2s ease;
  }

  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }

  .modal-enter-active .modal-container,
  .modal-leave-active .modal-container {
    transition: transform 0.2s ease;
  }

  .modal-enter-from .modal-container,
  .modal-leave-to .modal-container {
    transform: scale(0.95);
  }
}
</style>
