lib.addCommand('zonecreator', {
    help = 'Open the Zone Creator UI to create polyzones visually',
    restricted = 'group.admin'
}, function(source, args, raw)
    TriggerClientEvent('sd-zonecreator:openZoneCreator', source)
end)
