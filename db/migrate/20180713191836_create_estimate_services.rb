class CreateEstimateServices < ActiveRecord::Migration
  def change
    create_table :estimate_services do |t|
      t.integer :estimate_id
      t.integer :service_id
      t.string :amount
      t.string :price
      t.string :total_price
      
      t.timestamps null: false
    end
  end
end
