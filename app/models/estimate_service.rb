class EstimateService < ActiveRecord::Base
  validates :estimate_id, presence: true
  validates :service_id, presence: true 
  validates :amount, presence: true
  validates :price, presence: true
  validates :total_price, presence: true
  
end
