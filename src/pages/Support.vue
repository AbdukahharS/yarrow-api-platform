<script setup lang="ts">
import { ref } from 'vue'
import { useTickets } from '@/composables/useTickets'
import TicketList from '@/components/support/TicketList.vue'
import TicketDetail from '@/components/support/TicketDetail.vue'
import NewTicketModal from '@/components/support/NewTicketModal.vue'
import type { NewTicketData } from '@/types/support'

const {
  tickets,
  selectedTicketId,
  selectedTicket,
  selectTicket,
  sendMessage,
  createTicket,
} = useTickets()

const isNewTicketModalOpen = ref(false)

const openNewTicketModal = () => {
  isNewTicketModalOpen.value = true
}

const closeNewTicketModal = () => {
  isNewTicketModalOpen.value = false
}

const handleCreateTicket = (data: NewTicketData) => {
  createTicket(data)
  closeNewTicketModal()
}

const handleAttach = () => {
  // TODO: Implement file attachment
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
      <TicketList
        :tickets="tickets"
        :selected-ticket-id="selectedTicketId"
        @select="selectTicket"
      />

      <TicketDetail
        v-if="selectedTicket"
        :ticket="selectedTicket"
        @send-message="sendMessage"
        @attach="handleAttach"
      />
    </div>

    <NewTicketModal
      :is-open="isNewTicketModalOpen"
      @close="closeNewTicketModal"
      @create="handleCreateTicket"
    />
  </div>
</template>

<style scoped>
#support {
  padding: 24px 0;
  height: calc(100vh - 73px);
  max-height: calc(100vh - 73px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.top .left h2 {
  font-size: 24px;
  line-height: 32px;
  font-weight: 500;
  margin-bottom: 4px;
}

.top .left p {
  font-size: 14px;
  line-height: 20px;
  color: var(--text-secondary);
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

.support-content {
  display: flex;
  gap: 24px;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
</style>
