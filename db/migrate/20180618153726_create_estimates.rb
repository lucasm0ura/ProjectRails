class CreateEstimates < ActiveRecord::Migration
  def change
    create_table :estimates do |t|
      t.references, :client
      t.string, :status
      t.string, :price_total
      t.timestamp, :order_service_at
      t.timestamp :order_exit_at

      t.timestamps null: false
    end
  end
end
