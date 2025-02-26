<template>
    <div>
        <h1 class="text-2xl font-bold mb-6">Dashboard</h1>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <UiAppCard>
  <template #header>
    <h2 class="text-lg font-semibold">Total Budget</h2>
  </template>
  <div class="text-3xl font-bold text-primary">$300</div>
</UiAppCard>

            <UiAppCard>
                <template #header>
                    <h2 class="text-lg font-semibold">Total Expenses</h2>
                </template>
                <div class="text-3xl font-bold text-danger">$200</div>
            </UiAppCard>

            <UiAppCard>
                <template #header>
                    <h2 class="text-lg font-semibold">Remaining</h2>
                </template>
                <div class="text-3xl font-bold" :class="remaining >= 0 ? 'text-secondary' : 'text-danger'">
                    $100
                </div>
            </UiAppCard>
        </div>

        <!-- <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BudgetSummary />
            <ExpenseList :limit="5" />
        </div> -->
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'

</script>