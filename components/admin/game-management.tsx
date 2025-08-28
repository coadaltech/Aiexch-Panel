"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  Users,
  Activity,
  DollarSign,
  Gamepad2,
} from "lucide-react"

// Mock game data
const mockGames = [
  {
    id: "1",
    name: "Cyber Strike Championship",
    category: "FPS",
    status: "active",
    players: 2847,
    matches: 1523,
    revenue: "₹45,000",
    avgDuration: "12 min",
    rating: 4.8,
    lastUpdated: "2 hours ago",
    description: "Fast-paced tactical shooter with competitive gameplay",
    minPlayers: 2,
    maxPlayers: 10,
    entryFee: "₹50",
  },
  {
    id: "2",
    name: "Speed Racing League",
    category: "Racing",
    status: "active",
    players: 1923,
    matches: 892,
    revenue: "₹32,500",
    avgDuration: "8 min",
    rating: 4.6,
    lastUpdated: "1 day ago",
    description: "High-speed racing with customizable vehicles",
    minPlayers: 2,
    maxPlayers: 8,
    entryFee: "₹30",
  },
  {
    id: "3",
    name: "Cricket Master",
    category: "Sports",
    status: "maintenance",
    players: 3421,
    matches: 2156,
    revenue: "₹67,800",
    avgDuration: "15 min",
    rating: 4.9,
    lastUpdated: "3 hours ago",
    description: "Realistic cricket simulation with tournament modes",
    minPlayers: 2,
    maxPlayers: 2,
    entryFee: "₹25",
  },
  {
    id: "4",
    name: "Basketball Arena",
    category: "Sports",
    status: "inactive",
    players: 567,
    matches: 234,
    revenue: "₹8,900",
    avgDuration: "10 min",
    rating: 4.2,
    lastUpdated: "1 week ago",
    description: "3v3 basketball with arcade-style gameplay",
    minPlayers: 2,
    maxPlayers: 6,
    entryFee: "₹40",
  },
  {
    id: "5",
    name: "Space Conquest War",
    category: "Strategy",
    status: "active",
    players: 1456,
    matches: 678,
    revenue: "₹28,700",
    avgDuration: "20 min",
    rating: 4.7,
    lastUpdated: "5 hours ago",
    description: "Real-time strategy game with space exploration",
    minPlayers: 2,
    maxPlayers: 4,
    entryFee: "₹75",
  },
]

export function GameManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedGame, setSelectedGame] = useState<(typeof mockGames)[0] | null>(null)
  const [isAddGameOpen, setIsAddGameOpen] = useState(false)

  const filteredGames = mockGames.filter((game) => {
    const matchesSearch =
      game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || game.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Inactive</Badge>
      case "maintenance":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Maintenance</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    const colors = {
      FPS: "bg-red-500/20 text-red-400 border-red-500/30",
      Racing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      Sports: "bg-green-500/20 text-green-400 border-green-500/30",
      Strategy: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    }
    return (
      <Badge className={colors[category as keyof typeof colors] || "bg-gray-500/20 text-gray-400 border-gray-500/30"}>
        {category}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gaming-card-gradient border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Games</CardTitle>
            <Gamepad2 className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent">+8</span> new this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gaming-card-gradient border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Players</CardTitle>
            <Users className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,214</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-secondary">+15%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gaming-card-gradient border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
            <Activity className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,483</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent">+23%</span> this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gaming-card-gradient border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Game Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1.8L</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Game Management Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Game Management</CardTitle>
              <CardDescription>Manage and monitor all platform games</CardDescription>
            </div>
            <Dialog open={isAddGameOpen} onOpenChange={setIsAddGameOpen}>
              <DialogTrigger asChild>
                <Button className="bg-accent hover:bg-accent/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Game
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Game</DialogTitle>
                  <DialogDescription>Create a new game for the platform.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="gameName" className="text-right">
                      Name
                    </Label>
                    <Input id="gameName" placeholder="Enter game name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fps">FPS</SelectItem>
                        <SelectItem value="racing">Racing</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="strategy">Strategy</SelectItem>
                        <SelectItem value="puzzle">Puzzle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="entryFee" className="text-right">
                      Entry Fee
                    </Label>
                    <Input id="entryFee" placeholder="₹50" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea id="description" placeholder="Game description" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-accent hover:bg-accent/90">
                    Create Game
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search games by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Games Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Game</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Players</TableHead>
                  <TableHead>Matches</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGames.map((game) => (
                  <TableRow key={game.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{game.name}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          {getCategoryBadge(game.category)}
                          <span className="text-xs text-muted-foreground">{game.avgDuration} avg</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(game.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{game.players.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>{game.matches.toLocaleString()}</TableCell>
                    <TableCell className="font-medium text-accent">{game.revenue}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <span>⭐</span>
                        <span>{game.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => setSelectedGame(game)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Game
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {game.status === "active" ? (
                            <DropdownMenuItem>
                              <Pause className="mr-2 h-4 w-4" />
                              Deactivate
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>
                              <Play className="mr-2 h-4 w-4" />
                              Activate
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Game
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Game Details Dialog */}
      <Dialog open={!!selectedGame} onOpenChange={() => setSelectedGame(null)}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedGame && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedGame.name}</DialogTitle>
                <DialogDescription>Game configuration and settings</DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <div>{getCategoryBadge(selectedGame.category)}</div>
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <div>{getStatusBadge(selectedGame.status)}</div>
                    </div>
                    <div className="space-y-2">
                      <Label>Entry Fee</Label>
                      <div className="text-sm font-medium">{selectedGame.entryFee}</div>
                    </div>
                    <div className="space-y-2">
                      <Label>Players</Label>
                      <div className="text-sm">
                        {selectedGame.minPlayers}-{selectedGame.maxPlayers}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <p className="text-sm text-muted-foreground">{selectedGame.description}</p>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Game Active</Label>
                        <div className="text-sm text-muted-foreground">Enable/disable game for players</div>
                      </div>
                      <Switch defaultChecked={selectedGame.status === "active"} />
                    </div>
                    <div className="space-y-2">
                      <Label>Entry Fee</Label>
                      <Input defaultValue={selectedGame.entryFee} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Min Players</Label>
                        <Input type="number" defaultValue={selectedGame.minPlayers} />
                      </div>
                      <div className="space-y-2">
                        <Label>Max Players</Label>
                        <Input type="number" defaultValue={selectedGame.maxPlayers} />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-accent">{selectedGame.players.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Total Players</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-secondary">{selectedGame.matches.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Total Matches</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-accent">{selectedGame.revenue}</div>
                        <p className="text-xs text-muted-foreground">Revenue Generated</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-primary">{selectedGame.rating}</div>
                        <p className="text-xs text-muted-foreground">Average Rating</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedGame(null)}>
                  Close
                </Button>
                <Button className="bg-accent hover:bg-accent/90">Save Changes</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
