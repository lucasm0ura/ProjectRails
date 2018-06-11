class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user

    if user.role? :administrator
      can :manage, :all
    end

#     if user.role? :coordenador
#       can :manage, :ranking
#       can :manage, Itinerary, id: managed_itineraries
#       can :manage, Picture, imageable_id: managed_itineraries, imageable_type: 'Itinerary'
#     end

#     if user.role? :unidade
#       can :read, Itinerary, id: managed_itineraries
#       cannot :index, Itinerary
#     end

  end
end