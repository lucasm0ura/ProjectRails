class CreateEstimates < ActiveRecord::Migration
  def change
    create_table :estimates do |t|
      t.integer :client_id, index: true
      t.text :observation
      t.string :status
      t.string :price_total
      t.timestamp :order_service_at
      t.timestamp :order_exit_at

      t.timestamps null: false
    end
  end
end
